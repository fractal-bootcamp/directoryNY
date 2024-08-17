import { useEffect, useState } from "react";
import { UserService } from "../../../lib/services/Users/service";
import SpaceListingService from "../../../lib/services/Space-Listing/service";
import { SpaceListing } from "../../../lib/services/Space-Listing/types";
import { User } from "../../../lib/services/Users/types";
import { SpaceListingCreateForm } from "../SpaceListingCreateForm";


import SpaceListingModal from "../Modal/SpaceListingModal";// Adjust the import path

interface SpaceBannerProps {
  onListingAdded: () => void;
}



interface SpaceBannerProps {
  onListingAdded: () => void;
}

const SpaceBanner = ({ onListingAdded }: SpaceBannerProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  return (
    <div className="flex flex-col p-4 border border-2 rounded-lg bg-[#F5F8F7] gap-2 mb-2">
      <div className="text-md lg:text-base font-bold">
        👋 Are you looking for housing?
      </div>
      <div className="text-sm lg:text-base ">
        Create a profile to be discovered by communities and organizers
      </div>
      <button
        className="bg-[#4CAF50] text-xs text-white p-3 rounded-3xl w-fit px-4"
        onClick={openModal}
      >
        Add me
      </button>
      {isModalOpen && (
        <SpaceListingModal
          onClose={closeModal}
          onSubmitSuccess={onListingAdded}
        />
      )}
    </div>
  );
};

export default SpaceBanner;
