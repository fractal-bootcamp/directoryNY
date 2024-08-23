import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { UserService } from "../../../lib/services/Users/service";
import UserListingService from "../../../lib/services/User-Listing/service";
import SpaceListingService from "../../../lib/services/Space-Listing/service";


interface DeleteListingModalProps {
    onClose: () => void;
    onSubmitSuccess: () => void;
    listingCategory: "SpaceListing" | "UserListing";
    listingId: string;
}


const DeleteListingModal: React.FC<DeleteListingModalProps> = ({
    onClose,
    onSubmitSuccess,
    listingCategory,
    listingId
}) => {
    const userListingService = UserListingService();
    const spaceListingService = SpaceListingService();

    const handleSubmit = () => {
        if (listingCategory === "SpaceListing") {
            spaceListingService.delete(listingId);
        } else if (listingCategory === "UserListing") {
            userListingService.delete(listingId);
        }
        onSubmitSuccess();
        onClose();
    }

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
                            className="border border-gray-200 relative transform overflow-y-auto rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 p-8"
                        >
                            <form className="flex flex-col text-xs">
                                <div className="flex flex-col justify-center items-center gap-2 ">
                                    <h3 className="text-lg font-bold">Delete listing</h3>
                                    <div className="text-sm text-gray-500 w-[50%] text-center">
                                        Would you like to delete your listing? This action is irreversible.
                                    </div>
                                    <div className="flex flex-row gap-4 mt-4">

                                        <button onClick={handleSubmit} className="bg-red-500 text-white p-2 rounded">
                                            Confirm Delete
                                        </button>
                                        <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded">
                                            Cancel
                                        </button>
                                    </div>
                                </div>

                            </form>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default DeleteListingModal;
