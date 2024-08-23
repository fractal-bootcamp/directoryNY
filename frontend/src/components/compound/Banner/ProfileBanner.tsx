import React, { useState } from "react";
import UserListingModal from "../Modal/UserListingModal"; // Adjust the import path

interface ProfileBannerProps {
  onListingAdded: () => void;
}

const ProfileBanner = ({ onListingAdded }: ProfileBannerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  return (
    <div className="flex flex-col p-4 border border-2 rounded-lg bg-[#F5F8F7] gap-2 mb-6">
      <div className="text-md lg:text-lg font-bold">
        👋 Are you looking for housing?
      </div>
      <div className="text-sm lg:text-base ">
        Create a profile to be discovered by communities and organizers
      </div>
      <button
        className="bg-[#5279E0] text-sm text-white p-3 rounded-3xl w-fit px-4"
        onClick={openModal}
      >
        Add me
      </button>
      {isModalOpen && (
        <UserListingModal
          onClose={closeModal}
          onSubmitSuccess={onListingAdded}
        />
      )}
    </div>
  );
};

export default ProfileBanner;
