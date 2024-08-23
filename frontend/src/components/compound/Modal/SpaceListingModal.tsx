import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { SpaceListingInput } from "../../../lib/services/Space-Listing/types";
import SpaceListingService from "../../../lib/services/Space-Listing/service";
import { UserService } from "../../../lib/services/Users/service";
import Dropdown from "../Dropdown";


enum RoomPrice {
    LessThan1500 = "< $1500",
    Between1500And1999 = "$1500 - $1999",
    Between2000And2499 = "$2000 - $2499",
    Between2500And3000 = "$2500 - $3000",
    MoreThan3000 = "> $3000",
}

interface SpaceListingModalProps {
    onClose: () => void;
    onSubmitSuccess: () => void;
    listingExists: boolean;
}

const SpaceListingModal: React.FC<SpaceListingModalProps> = ({
    onClose,
    onSubmitSuccess,
    listingExists,
}) => {
    const userService = UserService();
    const [editListingId, setEditListingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<SpaceListingInput>({
        user_id: "",
        name: "",
        description: "",
        location: "",
        housemates: "",
        website: "",
        image: "",
        phone: "",
        email: "",
        priceRange: "",
    });

    useEffect(() => {
        const fetchUserAndListing = async () => {
            const userResponse = await userService.getCurrentUser();
            const user = userResponse.data;
            if (!user) return;

            const spaceListingService = SpaceListingService();
            const listingsResponse = await spaceListingService.getAll();
            const editListingId = listingsResponse.data.find(listing => listing.user_id === user.id);

            if (editListingId && listingExists) {
                setFormData({
                    user_id: editListingId.user_id,
                    name: editListingId.name,
                    description: editListingId.description,
                    location: editListingId.location,
                    housemates: editListingId.housemates,
                    website: editListingId.website || "",
                    image: editListingId.image || "",
                    phone: editListingId.phone || "",
                    email: editListingId.email || "",
                    priceRange: editListingId.priceRange,
                });
                setEditListingId(editListingId.id);
            } else {
                setFormData(prevData => ({ ...prevData, user_id: user.id || "" }));
            }
        };
        fetchUserAndListing();
    }, []);



    const onFilterChange = (field: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };




    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log("form", formData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const spaceListingService = SpaceListingService();

        try {
            if (editListingId && listingExists) {
                await spaceListingService.update(
                    editListingId,
                    formData
                );
                console.log("Updated:", { formData });
            }
            else {

                await spaceListingService.create(formData);
                console.log("Submitted:", { formData });
            }
            onSubmitSuccess();
            onClose();
        } catch (error) {
            console.log("Error submitting form:", error);
        }

        onClose();
    };

    return (
        <>
            <Dialog open={true} onClose={onClose} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-white bg-opacity-85 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                    <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 h-screen">
                        <DialogPanel
                            transition
                            className="h-4/6 relative transform overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-8 border border-gray-200"
                        >
                            <form onSubmit={handleSubmit} className="flex flex-col text-xs">
                                <div className="flex flex-col mb-4 ">
                                    <h3 className="text-lg font-bold">Create Listing</h3>
                                    <p className="text-sm text-gray-500">
                                        Make your space discoverable on DirectorySF
                                    </p>
                                </div>
                                <section>
                                    <label className="text-xs text-gray-500">
                                        Name
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="Solaris, The Embassy, Mosaic"
                                        />
                                    </label>
                                </section>
                                <span className="text-xs text-gray-500 mb-8">
                                    If you haven't named your space, now's a great time!
                                </span>
                                <section>
                                    <label className="text-xs text-gray-500 ">
                                        Description
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="Tell us about the space"
                                        />
                                    </label>
                                </section>
                                <section className="mb-4">
                                    <label className="text-xs text-gray-500 mb-2">
                                        Location
                                    </label>
                                    <Dropdown
                                        options={["brooklyn", "manhattan", "bedford", "sf"]}
                                        onSelect={(value) => onFilterChange('location', value)}
                                        defaultOption="Location"
                                    />
                                </section>
                                <section>
                                    <label className="text-xs text-gray-500">
                                        Number of housemates
                                        <input
                                            name="housemates"
                                            type="number"
                                            value={formData.housemates}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="0"
                                        />
                                    </label>
                                </section>
                                <section>
                                    <span>Room price</span>
                                    <div className="mb-4 flex flex-col gap-2 mt-2">
                                        <label>
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={RoomPrice.LessThan1500}
                                                checked={formData.priceRange === RoomPrice.LessThan1500}
                                                onChange={handleChange}
                                            />
                                            {RoomPrice.LessThan1500}
                                        </label>
                                        <label className="">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={RoomPrice.Between1500And1999}
                                                checked={formData.priceRange === RoomPrice.Between1500And1999}
                                                onChange={handleChange}
                                            />
                                            {RoomPrice.Between1500And1999}
                                        </label>
                                        <label className="">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={RoomPrice.Between2000And2499}
                                                checked={formData.priceRange === RoomPrice.Between2000And2499}
                                                onChange={handleChange}
                                            />
                                            {RoomPrice.Between2000And2499}
                                        </label>
                                        <label className="">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={RoomPrice.Between2500And3000}
                                                checked={formData.priceRange === RoomPrice.Between2500And3000}
                                                onChange={handleChange}
                                            />
                                            {RoomPrice.Between2500And3000}
                                        </label>
                                        <label className="">
                                            <input
                                                type="radio"
                                                name="priceRange"
                                                value={RoomPrice.MoreThan3000}
                                                checked={formData.priceRange === RoomPrice.MoreThan3000}
                                                onChange={handleChange}
                                            />
                                            {RoomPrice.MoreThan3000}
                                        </label>
                                    </div>
                                </section>
                                <section>
                                    <label className="text-xs text-gray-500">
                                        Website (optional)
                                        <input
                                            name="website"
                                            type="text"
                                            value={formData.website}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="https://www.solaris.com"
                                        />
                                    </label>
                                </section>
                                <section>
                                    <label className="text-xs text-gray-500">
                                        Image (optional)
                                        <input
                                            name="image"
                                            type="text"
                                            value={formData.image}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="https://www.solaris.com"
                                        />
                                    </label>
                                </section>
                                <section>
                                    <label className="text-xs text-gray-500">
                                        Contact phone number (optional)
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="+1234567890"
                                        />
                                    </label>
                                </section>
                                <section>
                                    <label className="text-xs text-gray-500">
                                        Contact email (optional)
                                        <input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="border p-2 rounded mb-4 w-full text-xs"
                                            placeholder="email@email.com"
                                        />
                                    </label>
                                </section>
                                <div className="flex justify-start">
                                    <button
                                        disabled={
                                            !formData.description ||
                                            !formData.name ||
                                            !formData.location ||
                                            !formData.housemates ||
                                            !formData.priceRange
                                        }
                                        type="submit"
                                        className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default SpaceListingModal;
