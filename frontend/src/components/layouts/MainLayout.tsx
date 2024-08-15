import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../compound/NavBar/NavBar"
import { UserService } from "../../lib/services/users/service";
import { useEffect } from "react";

const MainLayout: React.FC = () => {
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            try {
                await UserService().getCurrentUser(); // Use the instance to call the method

            } catch (error) {
                console.error("Error fetching current user:", error); // Log the error
                navigate('/login');
            }
        })();
    }, []);

    return (
        <div>
            <div>
                <NavBar />
            </div>
            <main className="pt-44 xs:pt-52 sm:pt-32 md:pt-32 lg:pt-32 xl:pt-32 bg-primary">

                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout;
