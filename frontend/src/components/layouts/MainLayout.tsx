import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../compound/NavBar/NavBar";
import { UserService } from "../../lib/services/Users/service";
import { User } from "../../lib/services/Users/types";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase auth

const MainLayout: React.FC = () => {
    const navigate = useNavigate();
    const auth = getAuth(); // Get the Firebase auth instance

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user: User | null) => {
            if (!user) {
                navigate("/login"); // Redirect to /login if user is not logged in
            }
        });
        return () => unsubscribeAuth(); // Clean up the listener on unmount
    }, [auth, navigate]);

<<<<<<< HEAD
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       await UserService().getCurrentUser(); // Use the instance to call the method
  //     } catch (error) {
  //       console.error("Error fetching current user:", error); // Log the error
  //       navigate("/login");
  //     }
  //   })();
  // }, []);
=======
    useEffect(() => {
        (async () => {
            try {
                await UserService().getCurrentUser(); // Use the instance to call the method
            } catch (error) {
                console.error("Error fetching current user:", error); // Log the error
                navigate("/login");
            }
        })();
    }, []);
>>>>>>> main

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <main className="px-8 py-6 bg-primary">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;
