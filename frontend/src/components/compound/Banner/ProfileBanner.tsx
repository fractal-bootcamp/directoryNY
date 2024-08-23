import React, { useState } from "react";
import UserListingModal from "../Modal/UserListingModal"; // Adjust the import path
import { UserListingDisplayData } from "../../../lib/services/User-Listing/types";
import DeleteListingModal from "../Modal/DeleteListingModal";

interface ProfileBannerProps {
  handleListingsChanged: () => void;
  userListings: Array<UserListingDisplayData>;
}

const ProfileBanner = ({ handleListingsChanged, userListings }: ProfileBannerProps) => {
  const [isAddEditModalOpen, setAddEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const listingExists: boolean = userListings.length > 0;

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
    <div className="flex flex-col p-4 border border-2 rounded-lg bg-[#F5F8F7] gap-2 mb-2">
      <div className="text-md lg:text-base font-bold">
        👋 Are you looking for housing?
      </div>
      <div className="text-sm lg:text-base ">
        Create a profile to be discovered by communities and organizers
      </div>

      <div className="flex flex-row gap-2">

        <button
          className="bg-[#5279E0] text-xs text-white p-3 rounded-3xl w-fit px-4"
          onClick={openAddEditModal}
        >
          {listingExists ? "Edit profile" : "Add profile"}
        </button>
        {listingExists && (
          <button
            className="bg-red-400 text-xs text-white p-3 rounded-3xl w-fit px-4"
            onClick={handleDeleteClick}
          >
            Delete profile
          </button>
        )}
      </div>
      {isAddEditModalOpen && (
        <UserListingModal
          onClose={closeAddEditModal}
          onSubmitSuccess={handleListingsChanged}
          listingExists={listingExists}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteListingModal
          onClose={closeDeleteModal}
          onSubmitSuccess={handleListingsChanged}
          listingCategory="UserListing"
          listingId={userListings[0].id}
        />
      )}
    </div>
  );
};

export default ProfileBanner;
