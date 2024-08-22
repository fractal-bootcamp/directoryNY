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

            // will need to add logic to check if the user has a referral code in their profile
            // if they do, check if it has reached its usage limit
            // if it has, create a new referral code
            // if it has not, use the existing one
            // if the user does not have a referral code, create a new one

            // Create a new referral if the user exists
            console.log('Creating new referral');
            try {
                const newReferral = await client.referral.create({
                    data: {
                        referrer: { connect: { id: userId } },
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
    const { referralCode, newUserId } = req.body;

    try {
        const referral = await client.referral.findUnique({
            where: { id: referralCode },
            include: { referrer: true }
        });

        if (!referral) {
            return res.status(404).json({ error: 'Invalid referral code' });
        }

        if (referral.count >= referral.usageLimit) {
            return res.status(400).json({ error: 'Referral code has reached its usage limit' });
        }

        // Update the user being referred
        await client.user.update({
            where: { id: newUserId },
            data: { referredbyId: referralCode }
        });

        // Update the referral
        await client.referral.update({
            where: { id: referralCode },
            data: {
                referredUsers: { connect: { id: newUserId } },
                count: { increment: 1 }
            }
        });

        res.json({ message: 'Referral applied successfully' });
    } catch (error) {
        console.error('Error applying referral:', error);
        res.status(500).json({ error: 'Failed to apply referral' });
    }
});

// Get referral details
router.get('/details/:referralId', async (req, res) => {
    const { referralId } = req.params;
    try {
        const referral = await client.referral.findUnique({
            where: { id: referralId },
            include: { referredUsers: true }
        });
        if (!referral) {
            return res.status(404).json({ error: 'Referral not found' });
        }
        res.json({
            id: referral.id,
            count: referral.count,
            usageLimit: referral.usageLimit,
            referredUsersCount: referral.referredUsers.length
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve referral details' });
    }
});

export default router;