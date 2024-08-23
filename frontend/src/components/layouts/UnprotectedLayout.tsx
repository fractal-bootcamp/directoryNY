import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { UserService } from "../../lib/services/Users/service";
import { useEffect, useState } from "react";
import { referralApi } from "../../../network/api";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const UnprotectedLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = getAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user && !isProcessing) {
                setIsProcessing(true);
                await checkUserAndApplyReferral();
                setIsProcessing(false);
            }
        });

        // Initial check for referral
        checkUserAndApplyReferral();

        return () => unsubscribe();
    }, [auth, navigate]);

    const checkUserAndApplyReferral = async () => {
        try {
            const userService = UserService();
            const user = await userService.getCurrentUser();

            if (user.data?.id) {
                if (user.data.active === true) {
                    navigate('/');
                } else {
                    await applyReferral();
                    // Recheck user status after applying referral
                    const updatedUser = await userService.getCurrentUser();
                    if (updatedUser.data?.active === true) {
                        navigate('/');
                    }
                }
            }
        } catch (error) {
            console.error('Error checking user status:', error);
        }
    };

    const applyReferral = async () => {
        const referralCode = localStorage.getItem('referralCode');
        const referrerId = localStorage.getItem('referrerId');

        if (referralCode && referrerId) {
            try {
                const current_user_res = await UserService().getCurrentUser();
                const current_user = current_user_res.data;

                if (current_user) {
                    const response = await referralApi.applyReferralCode(current_user.id, referralCode, referrerId);
                    if (response.status === 200) {
                        // Update the user state with the new data
                        setUser(response.data.user);

                        // Clear referral data from localStorage
                        localStorage.removeItem('referralCode');
                        localStorage.removeItem('referrerId');

                        // Optionally, show a success message to the user
                        // setSuccessMessage('Referral applied successfully');
                    } else {
                        throw new Error(`Referral application failed with status ${response.status}`);
                    }
                }
            } catch (error) {
                console.error('Error applying referral:', error.message);
                // Optionally, display an error message to the user
                // setErrorMessage('Failed to apply referral');
            }
        }
    };

    return (
        <div>
            <main
                className="overflow-hidden"
            >
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed" style={{
                    backgroundImage: "url('/rainbow_bg.png')",
                }}>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default UnprotectedLayout;