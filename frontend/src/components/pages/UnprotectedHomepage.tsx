import UnprotectedNavbar from "../compound/NavBar/UnprotectedNavbar";
import SignInButton from "../compound/SignInbutton";


const UnprotectedHomepage = () => {
    return (
        <div className="h-screen">
            <UnprotectedNavbar />

            <div className="flex flex-col items-center h-full gap-2 md:gap-6">
                <div className="relative flex justify-center min-h-20 min-w-24">
                    <img className="rounded-full w-20 lg:w-28 absolute top-0 left-[-120px]" alt="" src="https://pbs.twimg.com/profile_images/1716244628121198592/fM7njiyr_400x400.jpg" />
                    <img className="rounded-full w-20 lg:w-28 absolute top-0 left-[-60px]" alt="" src="https://pbs.twimg.com/profile_images/1629882819492077569/o5ME2qtN_400x400.jpg" />
                    <img className="rounded-full w-20 lg:w-28 absolute top-0 left-[0px]" alt="" src="https://pbs.twimg.com/profile_images/1816185734375616512/33gKppFS_400x400.jpg" />
                    <img className="rounded-full w-20 lg:w-28 absolute top-0 left-[60px]" alt="" src="https://pbs.twimg.com/profile_images/1750367523919261696/5FMtwST5_400x400.jpg" />
                    <img className="rounded-full w-20 lg:w-28 absolute top-0 left-[120px]" alt="" src="https://pbs.twimg.com/profile_images/1823562171474960386/gt09OLeI_400x400.jpg" />
                </div>
                {/* <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" alt="Google" /> */}
                <h1 className=" text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center flex flex-col w-4/5 lg:w-3/4 xl:w-3/5">
                    <span >Find sublets, housemates, and coliving communities in the NYC Fractal Scene</span>
                </h1>
                <span className="text-center text-black text-md sm:text-lg lg:text-xl p-1">A NY housing directory filled with people and houses we love</span>
                {/* <button onClick={() => navigate("/login/apply")} className="bg-white border-black border-[3px] text-black hover:bg-black/50 hover:text-white font-bold px-12 py-3 rounded-xl text-xl">Apply</button> */}
                <span className="text-center text-md sm:text-lg lg:text-xl">
                    <SignInButton />
                </span>


                <div className="flex text-center gap-2 bg-pink-200/50 md:gap-4 p-4 md:mt-8 text-sm">
                    <span><span className="text-white font-bold">1412</span> members of DirectorySF</span>
                    <span><span className="text-white font-bold">108</span> listings this month 🌈</span>
                </div>
                <div>

                </div>
            </div>
        </div>
    );
};

export default UnprotectedHomepage;
