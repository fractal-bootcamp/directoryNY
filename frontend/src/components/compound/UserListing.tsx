import SpaceListingService from "../../lib/services/Space-Listing/service";

import { UserListingDisplayData } from "../../lib/services/User-Listing/types";
import TwitterIcon from "@mui/icons-material/Twitter";
import ContactMe from "../helper/ContactMe";


export default function UserListing({
  UserListingData,
}: {
  UserListingData: UserListingDisplayData;
}) {
  return (
    <>
      <div className="p-4 bg-[#FFFDF3] rounded-2xl flex flex-col border-[1px] max-w-1/3 child-inherit-bg">
        <div className="flex items-center justify-between bg-inherit">
          <img
            className="rounded-full w-20 h-20 lg:w-28 lg:h-28 undefined mb-2"
            alt="User profile image"
            src={
              UserListingData.User.profilePicture
            }
          />

          <div className="flex flex-col items-center max-w-[60%] bg-inherit">
            <span className="font-semibold">{UserListingData.User.displayName}</span>
            {/* twitter handle with icon */}
            <a href={`https://twitter.com/${UserListingData.User.twitterHandle}`} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center text-blue-500 text-xs md:text-sm mb-2 hover:underline">
              {UserListingData.User.twitterHandle}
              <span className="text-blue-500 ml-0.5">
                <TwitterIcon fontSize="small" />
              </span>
            </a>
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
              <span className="text-xs md:text-sm">{UserListingData.leaselength}</span>
            </div>
            <div>
              <span className="text-xs md:text-sm font-semibold mr-1 ">
                Moving
              </span>{" "}
              <span className="text-xs md:text-sm">{UserListingData.moveInTime}</span>
            </div>
            <div>
              <div className="flex flex-row items-center">

                {UserListingData.User.referredByUser && (
                  <>
                    <span className="text-xs md:text-sm font-semibold mr-1">
                      Referred by
                    </span>
                    <a href={`https://twitter.com/${UserListingData.User.referredByUser.twitterHandle}`} className="flex items-center">
                      <img
                        className="rounded-full w-7 h-7 undefined"
                        alt="Referrer profile image"
                        src={UserListingData.User.referredByUser.profilePicture}
                      />
                      <span className="text-blue-500 hover:text-blue-400 m-1 text-xs">
                        {UserListingData.User.referredByUser.displayName}
                      </span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
