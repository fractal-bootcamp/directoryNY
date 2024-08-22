import TwitterIcon from "@mui/icons-material/Twitter";
import ContactMe from "../helper/ContactMe";
import { SpaceListing } from "../../lib/services/Space-Listing/types";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DescriptionBoxPopup from "../helper/DescriptionBox";
import { useState } from "react";

interface SpaceListingCardProps {
  SpaceData: SpaceListing;
  onListingAdded?: () => void;
}

export default function SpaceListingCard({
  SpaceData,
  onListingAdded,
}: SpaceListingCardProps) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setIsDescriptionOpen(true); // Function to open the modal
  };

  const closeModal = () => {
    setIsDescriptionOpen(false); // Function to close the modal
  };
  return (
    <>
      {isDescriptionOpen && (
        <DescriptionBoxPopup
          onClose={closeModal}
          description={SpaceData.description}
        />
      )}
      <div className="p-4 bg-[#FFFDF3] rounded-2xl flex flex-col border-[1px] w-full max-w-sm child-inherit-bg">
        <div className="flex items-center justify-between bg-inherit">
          <img
            className="rounded-full w-20 h-20 object-cover"
            alt="Space photo"
            src={
              SpaceData.image ||
              "https://www.shutterstock.com/image-photo/boat-tree-sunset-600nw-1770893537.jpg"
            }
          />
          <div className="flex flex-col items-end max-w-[60%] bg-inherit">
            <span className="font-semibold text-lg mb-2">{SpaceData.name}</span>
            <div className="flex gap-4">
              <div className="flex items-center">
                <LocationOnOutlinedIcon fontSize="small" />
                <p className="text-sm truncate ml-1">{SpaceData.location}</p>
              </div>
              <div className="flex items-center">
                <PeopleOutlineIcon fontSize="small" />
                <p className="text-sm ml-1">{SpaceData.housemates}</p>
              </div>
            </div>
            <ContactMe
              phone={SpaceData.phone}
              email={SpaceData.email}
              twitter_url={SpaceData.twitter_url}
            />
          </div>
        </div>

        <div className="flex items-center text-blue-500 text-sm mb-4">
          <span>@{SpaceData.twitter_handle}</span>
          <TwitterIcon fontSize="small" className="ml-1" />
        </div>

        <button
          onClick={openModal}
          className="rounded-xl text-xs p-2 bg-[#F6F5EB] my-1 text-slate-600 line-clamp-3 text-ellipsis pb-[0.14em] text-left"
        >
          {SpaceData.description}
        </button>

        <div className="text-sm bg-inherit">
          <div className="flex justify-between">
            <span className="font-semibold">Room Price:</span>
            <span>{SpaceData.room_price}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Lease Length:</span>
            <span>{SpaceData.leaselength}</span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-semibold mr-2">Referred by:</span>
          <a
            href={SpaceData.referrer_twitter_url}
            className="flex items-center"
          >
            <img
              className="rounded-full w-6 h-6 object-cover"
              alt="Referrer profile image"
              src={
                SpaceData.referrer_image ||
                "https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg"
              }
            />
            <span className="text-blue-500 hover:text-blue-400 ml-2 text-sm">
              {SpaceData.referrer_name}
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
