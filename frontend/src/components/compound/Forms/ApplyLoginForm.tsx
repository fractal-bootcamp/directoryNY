import { useState } from "react";

type formData = {
    twitter: string;
    name: string;
    email: string;
    lookingFor: string;
    roommates: string;
    reason: string;
    referral: string;
}
const ApplyLoginForm = ({ onSubmit }: { onSubmit: (formData: formData) => void }) => {
    const [formData, setFormData] = useState({
        twitter: '',
        name: '',
        email: '',
        lookingFor: '',
        roommates: '',
        reason: '',
        referral: ''
    });
    const [isDropdownOpen1, setDropdownOpen1] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(formData); // Send data to parent component
        console.log("submitting", formData);
    };

    const toggleDropdown1 = () => {
        setDropdownOpen1(!isDropdownOpen1);
        setDropdownOpen2(false); // Close the second dropdown
    };

    const toggleDropdown2 = () => {
        setDropdownOpen2(!isDropdownOpen2);
        setDropdownOpen1(false); // Close the first dropdown
    };

    const selectLookingFor = (value: string) => {
        setFormData({ ...formData, lookingFor: value });
        setDropdownOpen1(false); // Close the dropdown after selection
    };

    const selectRoommates = (value: string) => {
        setFormData({ ...formData, roommates: value });
        setDropdownOpen2(false); // Close the dropdown after selection
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col w-full sm:w-2/3 gap-y-10">
            {/* twitter */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> What's your Twitter? *</label>
                <input
                    type="text"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    className="border-2 border-gray-200 rounded-md p-2"
                />
            </div>
            {/* name */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> What's your name? *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border-2 border-gray-200 rounded-md p-2"
                />
            </div>
            {/* email */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> What's your email address? *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-2 border-gray-200 rounded-md p-2"
                />
            </div>
            {/* what are you looking for */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> What are you looking for? *</label>
                <div className="relative">
                    <div
                        onClick={toggleDropdown1}
                        className="py-3 px-4 inline-flex items-center justify-between w-full text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                        <span>{formData.lookingFor || ""}</span>
                        <svg
                            className={`transition-transform ${isDropdownOpen1 ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                    {isDropdownOpen1 && (
                        <div className="absolute z-10 min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 w-full">
                            <div
                                onClick={() => selectLookingFor("1 year lease")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-indigo-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">1 year lease</span>
                            </div>
                            <div
                                onClick={() => selectLookingFor("Short term sublet")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-blue-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">Short term sublet</span>
                            </div>
                            <div
                                onClick={() => selectLookingFor("Open to anything")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-green-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">Open to anything</span>

                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* roommates */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> Are you looking for roommate(s)? *</label>
                <div className="relative">
                    <div
                        onClick={toggleDropdown2}
                        className="py-3 px-4 inline-flex items-center justify-between w-full text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                    >
                        <span>{formData.roommates || ""}</span>
                        <svg
                            className={`transition-transform ${isDropdownOpen2 ? "rotate-180" : ""}`}
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m6 9 6 6 6-6" />
                        </svg>
                    </div>
                    {isDropdownOpen2 && (
                        <div className="absolute z-10 min-w-60 bg-white shadow-md rounded-lg p-1 space-y-0.5 mt-2 w-full">
                            <div
                                onClick={() => selectRoommates("Yes, just one")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-indigo-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">Yes, just one</span>
                            </div>
                            <div
                                onClick={() => selectRoommates("Yes, looking for multiple roommates")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-blue-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">Yes, looking for multiple roommates</span>
                            </div>
                            <div
                                onClick={() => selectRoommates("No, I want to live alone")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-green-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">No, I want to live alone</span>
                            </div>
                            <div
                                onClick={() => selectRoommates("No, I have roommates already")}
                                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                            >
                                <span className="bg-teal-100 text-black text-xs font-medium me-2 px-2.5 py-0.5 rounded-full ">No, I have roommates already</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {/* reason */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> Why do you want to use DirectorySF?</label>
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="border-2 border-gray-200 rounded-md p-2 h-40"
                />
            </div>
            {/* referral */}
            <div className="flex flex-col">
                <label className="text-lg font-normal"> Do you have a referral?</label>
                <input
                    type="text"
                    name="referral"
                    value={formData.referral}
                    onChange={(e) => setFormData({ ...formData, referral: e.target.value })}
                    className="border-2 border-gray-200 rounded-md p-2"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md self-start mb-10">
                Submit
            </button>
        </form>
    );
};

export default ApplyLoginForm;
