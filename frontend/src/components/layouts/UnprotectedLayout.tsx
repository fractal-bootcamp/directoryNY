import { Outlet, useNavigate } from "react-router-dom"
import UnprotectedNavbar from "../compound/NavBar/UnprotectedNavbar";
import { UserService } from "../../lib/services/users/service"; // Ensure UserService is correctly typed
import { useEffect } from "react";

const UnprotectedLayout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const userService = UserService(); // Ensure UserService has a constructor
            try {
                const user = await userService.getCurrentUser(); // Use the instance to call the method
                if (user.data?.id) {
                    navigate('/');
                }
            } catch (error) {
                console.error("Error fetching current user:", error); // Log the error
            }

        })();
    }, []);

    return (
        <div>
            <main className=" bg-primary">
                <div>
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default UnprotectedLayout;