import express from 'express';
import client from '../../../prisma/client';

const router = express.Router();

// generate or retrieve referral code for a user
router.get('/code/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        console.log('userId', userId);
        const referral = await client.referral.findFirst({
            where: { referrerId: userId },
            select: { id: true }
        });

        console.log('referral', referral);

        if (!referral) {
            // Check if the user exists
            const user = await client.user.findUnique({
                where: { id: userId }
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Create a new referral if the user exists
            console.log('Creating new referral');
            try {
                const newReferral = await client.referral.create({
                    data: {
                        referrer: { connect: { id: userId } },
                        status: 'pending',
                        referredUser: null

                    }
                });
                return res.json({ referralCode: newReferral.id });
            } catch (error) {
                console.error('Error creating referral:', error);
                return res.status(500).json({ error: 'Failed to create referral' });
            }
        }

        res.json({ referralCode: referral.id });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve or generate referral code' });
    }
});


// Apply a referral code when a new user signs up
router.post('/apply', async (req, res) => {
    const { newUserId, referralCode } = req.body;
    try {
        const referral = await client.referral.findUnique({
            where: { id: referralCode },
            include: { referrer: true }
        });
        if (!referral) {
            return res.status(404).json({ error: 'Invalid referral code' });
        }

        await client.user.update({
            where: { id: newUserId },
            data: { referredId: referral.referrerId }
        });

        await client.referral.update({
            where: { id: referralCode },
            data: {
                referredUser: newUserId,
                status: 'completed'
            }
        });

        res.json({ message: 'Referral applied successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to apply referral' });
    }
});

// Track referral status
router.get('/status/:referralId', async (req, res) => {
    const { referralId } = req.params;
    try {
        const referral = await client.referral.findUnique({
            where: { id: referralId }
        });
        if (!referral) {
            return res.status(404).json({ error: 'Referral not found' });
        }
        res.json({ status: referral.status });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve referral status' });
    }
});

export default router;