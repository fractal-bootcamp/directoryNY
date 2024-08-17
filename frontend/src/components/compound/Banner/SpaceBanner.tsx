import { useState } from "react";

import SpaceListingModal from "../Modal/SpaceListingModal";// Adjust the import path
import { SpaceListing } from "../../../lib/services/Space-Listing/types";
import UserListingService from "../../../lib/services/User-Listing/service";
import DeleteListingModal from "../Modal/DeleteListingModal";

interface SpaceBannerProps {
  handleListingsChanged: () => void;
  spaceListings: Array<SpaceListing>;
}

const SpaceBanner = ({ handleListingsChanged, spaceListings }: SpaceBannerProps) => {

  const listingExists: boolean = spaceListings.length > 0;


  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false); // State to manage modal visibility
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State to manage modal visibility

  const openAddEditModal = () => {
    setAddEditModalOpen(true); // Function to open the modal
  };

  const closeAddEditModal = () => {
    setAddEditModalOpen(false); // Function to close the modal
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };



  return (
    <div className="flex flex-col p-4 border border-2 rounded-lg bg-bgGreen gap-2 mb-2">
      <div className="text-md lg:text-base font-bold">
        👋 Are you looking for housing?
      </div>
      <div className="text-sm lg:text-base ">
        Create a profile to be discovered by communities and organizers
      </div>

      <div className="flex flex-row gap-2">
        <button
          className="bg-[#4CAF50] text-xs text-white p-3 rounded-3xl w-fit px-4"
          onClick={openAddEditModal}
        >
          {listingExists ? "Edit space listing" : "Add space listing"}
        </button>
        {listingExists && (
          <button
            className="bg-red-400 text-xs text-white p-3 rounded-3xl w-fit px-4"
            onClick={handleDeleteClick}
          >
            Delete space listing
          </button>
        )}
      </div>
      {isAddEditModalOpen && (
        <SpaceListingModal
          onClose={closeAddEditModal}
          onSubmitSuccess={handleListingsChanged}
          listingExists={listingExists}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteListingModal
          onClose={closeDeleteModal}
          onSubmitSuccess={handleListingsChanged}
          listingCategory="SpaceListing"
          listingId={spaceListings[0].id}
        />
      )}
    </div>
  );
};

export default SpaceBanner;
