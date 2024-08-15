import SpaceListingService from "../../lib/services/Space-Listing/service";

import { UserListingType } from "../../lib/services/User-Listing/types";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContactMe from "../helper/ContactMe";
import { UserListingProps } from "../../lib/services/User-Listing/types";

//https://pbs.twimg.com/profile_images/1387824030602780673/CqiWzrma_400x400.jpg

export default function UserListing({
  UserListingData,
  UserData,
  ReferrerData,
}: UserListingProps) {
  return (
    <>
      <div className="p-4 bg-[#FFFDF3] rounded-2xl flex flex-col border-[1px] max-w-1/3 child-inherit-bg">
        <div className="flex items-center justify-between bg-inherit">
          <img
            className="rounded-full w-20 h-20 lg:w-28 lg:h-28 undefined mb-2"
            alt="User profile image"
            src={
              "https://www.shutterstock.com/image-photo/boat-tree-sunset-600nw-1770893537.jpg"
            }
          />

          <div className="flex flex-col items-center max-w-[60%] bg-inherit">
            <span className="font-semibold">{UserData.name}</span>
            {/* twitter handle with icon */}
            <span className="flex flex-row items-center text-blue-500 text-xs md:text-sm mb-2">
              @{"twitterhandle"}
              <span className="text-blue-500 ml-0.5 ">
                <TwitterIcon fontSize="small" />
              </span>
            </span>
            <ContactMe
              phone={UserListingData.phone}
              email={UserListingData.email}
              twitter_url={undefined}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" rounded-xl text-xs p-2 bg-[#F6F5EB] my-1 text-slate-600">
            {UserListingData.description}
          </div>
          {/* <div className="flex flex-row gap-2"> */}
          <div className="text-xs md:text-sm bg-inherit">
            <div className="bg-inherit">
              <span className="text-xs md:text-sm font-semibold mr-1 bg-inherit">
                Preference
              </span>
              <span className="text-xs md:text-sm">
                {UserListingData.leaselength}
              </span>
            </div>
            <div>
              <span className="text-xs md:text-sm font-semibold mr-1 ">
                Moving
              </span>{" "}
              <span className="text-xs md:text-sm">
                {UserListingData.moveInTime}
              </span>
            </div>
            <div>
              <div className="flex flex-row items-center">
                <span className="text-xs md:text-sm font-semibold mr-1">
                  Referred by
                </span>
                <a
                  href={`http://x.com/${UserData.twitterHandle}`}
                  className="flex items-center"
                >
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
