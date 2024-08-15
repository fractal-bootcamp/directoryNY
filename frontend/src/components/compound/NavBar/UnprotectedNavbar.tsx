import React, { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const UnprotectedNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); // Manage the open state for the menu

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const HamburgerMenu: React.FC = () => {
        return (
            <div className="flex flex-col">
                <button
                    onClick={toggleMenu}
                    className="flex items-center justify-center w-10 h-10 text-gray-700 focus:outline-none"
                >
                    <MenuIcon />
                </button>
                {isOpen && (
                    <div className="absolute top-16 right-0 bg-primary z-10 w-screen border-t border-b border-gray-200"> {/* Full width */}
                        <ul className="flex flex-col items-center space-y-4 py-4">
                            <li>
                                <a
                                    href="#"
                                    className="font-noto-serif text-[#1D462F] font-semibold hover:bg-[#E7E8D9] hover:text-[#005B41] px-3 py-1 rounded-lg transition-all duration-300 inline-block w-full text-center"
                                >
                                    Solaris AI
                                </a>
                                {/* <div className="border-b border-gray-300 my-1"></div>  */}

                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-noto-serif text-[#1D462F] font-semibold hover:bg-[#E7E8D9] hover:text-[#005B41] px-3 py-1 rounded-lg transition-all duration-300 inline-block w-full text-center"
                                >
                                    DirectorySF
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-noto-serif text-[#1D462F] font-semibold hover:bg-[#E7E8D9] hover:text-[#005B41] px-3 py-1 rounded-lg transition-all duration-300 inline-block w-full text-center"
                                >
                                    Email
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="font-noto-serif text-[#1D462F] font-semibold hover:bg-[#E7E8D9] hover:text-[#005B41] px-3 py-1 rounded-lg transition-all duration-300 inline-block w-full text-center"
                                >
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    return (
        <nav className="bg-primary flex justify-between items-center px-4 sm:px-10 py-5 border-b border-black border-opacity-10 relative mb-10">
            <div>
                {/* <img src={ } alt="logo" /> */}
                solaris
            </div>
            <div className="md:hidden"> {/* Show hamburger menu on small screens */}
                <HamburgerMenu />
            </div>

        </nav>
    );
};

export default UnprotectedNavbar;
