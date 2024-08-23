import React from 'react';

const UnprotectedNavbar: React.FC = () => {

    return (
        <nav className="flex justify-between items-center px-4 sm:px-10 py-5 relative mb-10">
            <div>
                <img
                    src="/fractal.png"
                    alt="DirectoryNY Logo"
                    className="h-10 w-auto"
                />
            </div>
        </nav>
    );
};

export default UnprotectedNavbar;
