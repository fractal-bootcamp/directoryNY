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
                    <img className="max-w-48" src="https://v5.airtableusercontent.com/v3/u/32/32/1723759200000/hS4ZdhoEGQcs7ALP2aty4Q/v_F7yQFCxrPCDXvmmpxmIKC39vdQXfvniaAwako2GCS_odWe6oE42BGRgXamPYCvkwH4IEmmwxuiGppq70K61s0F7kOcRcF9CajKL7gM7B_dkDrAW6T-mTasct1MgK44gabK-wtchm0XYPs8-cQVXE60gbXOw1JppzvzfxT5sNA/PI75vpGnyM2DZ4AqVZ043uxP5pbMPaRWFF2Y7jszVu8" />
                    <h1 className="text-2xl mt-10 font-medium">Join DirectoryNY
                    </h1>
                    <p>
                        DirectoryNY is an invite-only housing network built on top of Twitter to help people in the tech industry find sublets, 1-yr rentals, coliving communities, and housemates.
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

