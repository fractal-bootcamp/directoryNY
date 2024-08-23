import ApplyLoginForm from "../compound/Forms/ApplyLoginForm";
import { useNavigate } from "react-router-dom";

const ApplyPage = () => {

    const navigate = useNavigate();

    const handleSubmit = (formData: any) => {
        console.log(formData);
        navigate("/login");
    }

    return (
        <div className="flex flex-col">
            <div className="bg-white p-8 flex flex-col items-center ">

                <div className="flex flex-col w-full sm:w-2/3">
                    <img className="max-w-48" src="https://i.pinimg.com/originals/f7/1b/4f/f71b4ffaeb2ee9832e3f9c9ff5a0a84d.png" />
                    <h1 className="text-2xl mt-10 font-medium">Join DirectoryNY
                    </h1>
                    <p>
                        DirectoryNY is an invite-only housing network built on top of Twitter to help people in the tech industry find sublets, 1-yr rentals, coliving communities, and housemates.
                    </p>
                    <p className="font-bold">
                        The fastest way to get onto our platform is a referral link from a friend!
                    </p>
                </div>
            </div>
            {/* form */}
            <div className="bg-[#F7F7F7] h-full p-8 flex flex-col items-center w-screen">
                <ApplyLoginForm onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default ApplyPage;

