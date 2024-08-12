import { useState } from 'react';
import firebaseApp from './firebase';
import { getAuth, signInWithPopup, TwitterAuthProvider, User, onAuthStateChanged, signOut } from "firebase/auth";

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
    const provider = new TwitterAuthProvider();
    const handleSignIn = async () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user as ExtendedUser; // Type assertion
                console.log('hello user', user)
                const username = user.reloadUserInfo.screenName
                const token = user.accessToken;
                const request = await fetch(`http://localhost:3009/test`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ username }),
                })
                const response = await request.json()
                console.log('hello response', response)


            }).catch((error) => {
                // Handle Errors here.
                console.log('hello error', error)
                const errorMessage = error.message;
                console.error(errorMessage)
            });
    }
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log('hello user', user)
            setUser(user as ExtendedUser)
        }
    })

    const signOut = () => {
        auth.signOut()
    }

    return (
        <>
            {!user &&
                <button onClick={handleSignIn} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                        <path fill-rule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clip-rule="evenodd" />
                    </svg>
                    Sign in with Twitter
                </button>}

            {user &&
                <button onClick={signOut} type="button" className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2">
                    Sign out
                </button>}
        </>
    );
};

export default SignInButton;
