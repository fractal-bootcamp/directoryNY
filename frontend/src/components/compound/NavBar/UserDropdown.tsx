import { useEffect, useState } from "react";
import { UserService } from "../../../lib/services/users/service";


export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileImage, setProfileImage] = useState("");

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        (async () => {
            const user = await UserService().getCurrentUser();
            setProfileImage(user.data.profilePicture);
        })();
    }, []);



    return (
        <div className="">
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 rounded-full focus:outline-none bg-transparent"
            >
                <img
                    src={profileImage}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
                <span className="text-gray-700">▼</span>
            </button>
            {isOpen && (
                <div className="absolute right-20 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Edit my listing</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Sign out</a>
                </div>
            )}
        </div>
    );
}