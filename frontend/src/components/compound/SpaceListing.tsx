import SpaceListingService from "../../lib/services/Space-Listing/service";

import { UserListingType } from "../../lib/services/User-Listing/types";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContactMe from "../helper/ContactMe";
import { SpaceListing } from "../../lib/services/Space-Listing/types";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DescriptionBox from "./DescriptionBox";

//https://pbs.twimg.com/profile_images/1387824030602780673/CqiWzrma_400x400.jpg

export default function SpaceListingCard({
  SpaceData,
}: {
  SpaceData: SpaceListing;
}) {
  const UserData = SpaceData;
  return (
    <>
      <div className="p-4 bg-[#FFFDF3] rounded-2xl flex flex-col border-[1px] max-w-1/3 child-inherit-bg">
        <div className="flex items-center justify-between bg-inherit">
          <img
            className="rounded-full w-20 h-20 lg:w-28 lg:h-28 undefined mb-2"
            alt="Space photo"
            src={
              "https://www.shutterstock.com/image-photo/boat-tree-sunset-600nw-1770893537.jpg"
            }
          />
          <div className="flex flex-col items-center max-w-[60%] bg-inherit">
            <span className="font-semibold">{"NAME"}</span>
            <div className="flex gap-4">
              <div className="flex">
                {/* <img className="mr-1 " src="src/assets/twopeople.svg"></img> */}
                <LocationOnOutlinedIcon />
                <p id="location" className="text-sm md:text-md truncate">
                  {SpaceData.location}
                </p>
              </div>
              <div className="flex">
                <PeopleOutlineIcon />
                <p className="text-sm md:text-md">{SpaceData.housemates}</p>
              </div>
            </div>
            {/* twitter handle with icon */}

            <span></span>
            <ContactMe
              phone={SpaceData.phone}
              email={SpaceData.email}
              twitter_url={SpaceData.twitter_url}
            />
          </div>
        </div>
        <span className="flex flex-row items-center text-blue-500 text-xs md:text-sm mb-2">
          @{"twitterhandle"}
          <span className="text-blue-500 ml-0.5 ">
            <TwitterIcon fontSize="small" />
          </span>
        </span>
        <div className="flex flex-col">
          <DescriptionBox
            description={
              "description description description descriptiondescription descriptiondescription descriptiondescription descriptiondescription descriptiondescription descriptiondescription descriptiondescription descriptiondescription descriptiondescription description description description descriptiondescription description description descriptiondescription description description descriptiondescription description description descriptiondescription description description descriptiondescription description description description"
            }
          />
          {/* <div className="flex flex-row gap-2"> */}
          <div className="text-xs md:text-sm bg-inherit">
            <div className="bg-inherit">
              <span className="text-xs md:text-sm font-semibold mr-1 bg-inherit">
                Room Price
              </span>
              <span className="text-xs md:text-sm">{UserData.leaselength}</span>
            </div>
            <div>
              <div className="flex flex-row items-center">
                <span className="text-xs md:text-sm font-semibold mr-1">
                  Referred by
                </span>
                <a href={"twitter.com"} className="flex items-center">
                  <img
                    className="rounded-full w-7 h-7 undefined"
                    alt="User profile image"
                    src={
                      "https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg"
                    }
                  />
                  <span className="text-blue-500 hover:text-blue-400 m-1 text-xs">
                    {"Referrer"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
