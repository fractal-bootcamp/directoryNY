import UnprotectedNavbar from "../compound/NavBar/UnprotectedNavbar";
import { useNavigate } from "react-router-dom";
import SignInButton from "../compound/SignInbutton";


const UnprotectedHomepage = () => {
    const navigate = useNavigate();
    return (
        <div className="h-screen">
            <UnprotectedNavbar />

            <div className="flex flex-col items-center h-full gap-6">
                <div className="relative flex justify-center min-h-20 min-w-24">
                    <img className="rounded-full w-20 lg:w-24 absolute top-0 left-[-40px]" alt="" src="https://www.directorysf.com/ellipse-51@3x.jpg" />
                    <img className="rounded-full w-20 lg:w-24 absolute top-0 left-0" alt="" src="https://www.directorysf.com/ellipse-50@3x.jpg" />
                    <img className="rounded-full w-20 lg:w-24 absolute top-0 left-[40px]" alt="" src="https://www.directorysf.com/ellipse-52@3x.jpg" />
                    <img className="rounded-full w-20 lg:w-24 absolute top-0 left-[80px]" alt="" src="https://www.directorysf.com/ellipse-53@3x.jpg" />
                </div>
                {/* <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" /> */}
                <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center flex flex-col w-4/5 lg:w-3/4 xl:w-3/5">
                    <span >Find rentals, housemates, sublets, and coliving communities in the SF tech scene</span>
                </h1>
                <span className="text-center text-gray-600 text-md sm:text-lg lg:text-xl">The SF housing directory of people you probably know</span>
                <button onClick={() => navigate("/login/apply")} className="bg-darkGreen text-white px-12 py-3 rounded-3xl text-xl">Apply</button>
                <span className="text-center text-gray-400 text-md sm:text-lg lg:text-xl">Have an account?
                    <SignInButton />
                </span>

                <div className="flex text-center gap-2 md:gap-4 border border-gray-300 rounded-3xl p-4 mt-8 text-sm">
                    <span><span className="text-blue-400 font-bold">1412</span> members of DirectorySF</span>
                    <span><span className="text-blue-400 font-bold">108</span> listings this month 🔥</span>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default UnprotectedHomepage;
