import { useEffect, useState } from "react"; // Ensure useState and useEffect are imported
import firebaseApp from "../../firebase";
import {
    getAuth,
    signInWithPopup,
    TwitterAuthProvider,
    User,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
} from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../../lib/services/Users/service";

interface ReloadUserInfo {
    screenName: string;
    accessToken: string;
}
interface ExtendedUser extends User {
    reloadUserInfo: ReloadUserInfo;
    accessToken: string;
}

const SignInButton = () => {
    const [user, setUser] = useState<ExtendedUser | null>(null);
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();
    const provider = new TwitterAuthProvider();

    const [referralCode, setReferralCode] = useState<string | null>(null); // State for referral code

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        //    const params= useParams()
        const code = params.get("referral"); // Get referral code from URL parameters
        if (code) {
            setReferralCode(code);
            console.log("Referral code from params:", code);
        }
    }, []);


    const handleSignIn = async () => {
        try {
            await setPersistence(auth, browserLocalPersistence);
            const result = await signInWithPopup(auth, provider);
            const user = result.user as ExtendedUser; // Type assertion
            const username = user.reloadUserInfo.screenName;
            const token = user.accessToken;
            sessionStorage.setItem("firebaseUserToken", token);

            // Handle referral code if present
            if (referralCode) {
                console.log("Using referral code:", referralCode);
                // Fetch request to submit the token and referral code
                const response = await fetch('/api/referral-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: token,
                        referralCode: referralCode,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to submit referral code');
                }
                const data = await response.json();
                console.log("Referral code response:", data);
            }

            //Sending the twitter handle to the backend to save it with the user
            const current_user_res = await UserService().getCurrentUser();
            const current_user = current_user_res.data;
            if (current_user) {
                const response = await UserService().update(current_user.id, {
                    ...current_user,
                    twitterHandle: username,
                });
                // await request.json();
                if (!response.error) {
                    navigate("/");
                    // Ensure this is reached
                }
            } else {
                console.error("no current user");
            }
        } catch (error) {
            console.error("Error during sign-in:", error); // Log any errors
        }
    };
    onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
            console.log("hello user", user);
            setUser(user as ExtendedUser);
        }
    });
    const signOut = () => {
        sessionStorage.removeItem("firebaseUserToken");
        auth.signOut();
    };

    return (
        <>
            {!user && (
                <button
                    onClick={handleSignIn}
                    type="button"
                    className="text-black hover:bg-[#1da1f2]/50 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                >
                    <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 17"
                    >
                        <path
                            fillRule="evenodd"
                            d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                            clipRule="evenodd"
                        />
                    </svg>
                    Sign in with Twitter
                </button>
            )}

            {user && (
                <button
                    onClick={signOut}
                    type="button"
                    className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                >
                    Sign out
                </button>
            )}
        </>
    );
};

export default SignInButton;
