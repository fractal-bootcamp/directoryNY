import { CreateSpaceListingArea } from "../compound/CreateSpaceListingArea";
import SpaceListingSection from "./SpaceListingsSection";
import SpaceListingCard from "../compound/SpaceListing";
import UserListing from "../compound/UserListing";

export const SpaceListingPage = () => {
  const space_listing = {
    // id: string;
    user_id: "4234232",
    phone: "00000",
    email: "test@test.com",
    description:
      "A description. A description. A description. A description. A description",
    housematesCount: "3-5 roomies",
    website: "google.com",
    location: "Location",
    image: "Image",
    housemates: 5,
    priceRange: "$1500-$1999",
  };
  const userdata = {
    // id: string;
    user_id: "424242",
    phone: "00000",
    email: "test@test.com",
    description:
      "A description. A description. A description. A description. A description",
    moveInTime: "ASAP",
    leaselength: "1-year lease",
    housematesCount: "3-5 roomies",
    website: "google.com",
  };

  return (
    <>
      <CreateSpaceListingArea />
      <SpaceListingSection />
      <div className="w-[30%]">
        <SpaceListingCard SpaceData={space_listing} />
      </div>
    </>
  );
};
