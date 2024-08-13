import SpaceListingService from "../../lib/services/Space-Listing/service";
import { UserListingProps } from "../types";

//https://pbs.twimg.com/profile_images/1387824030602780673/CqiWzrma_400x400.jpg

export default function UserListing({ UserData }: UserListingProps) {
  return (
    <>
      <div className="p-6 bg-[#FFFDF3] rounded-2xl flex flex-col gap-4 border-[1px] max-w-sm m-2">
        <div className="flex items-center justify-between gap-2">
          <img
            className="rounded-full w-28 h-28 lg:w-36 lg:h-36 undefined"
            alt="User profile image"
            src={UserData.twitter_photo_url}
          />
          <div className="flex flex-col items-center max-w-[60%]">
            <span className="font-semibold">{UserData.name}</span>
            <a
              href={UserData.contact.twitter_url}
              className="text-blue-500 hover:text-blue-400 "
            >
              @{UserData.contact.twitter_handle}
            </a>
            <button className="bg-green-900 text-white rounded-3xl ring-offset-white font-semibold p-2">
              Contact me
            </button>
          </div>
        </div>
        <div className="flex flex-col">
          <div className=" rounded-xl text-sm p-2 bg-[#F6F5EB]">
            {UserData.description}
          </div>
          {/* <link href="google.com">google.com</link> */}
          {/* <div className="flex flex-row gap-2"> */}
          <div className="text-md">
            <div>
              <span className="font-medium mr-1">Preference</span>
              <span>{UserData.lease_preference}</span>
            </div>
            <div>
              <span className="font-medium mr-1">Moving</span>{" "}
              <span>{UserData.lease_timing}</span>
            </div>
            <div>
              <div>
                <span className="font-medium mr-1">Referred by</span>
                <a
                  href={UserData.referrer_info.twitter_url}
                  className="flex items-center"
                >
                  <img
                    className="rounded-full w-7 h-7 undefined"
                    alt="User profile image"
                    src={UserData.referrer_info.twitter_photo_url}
                  />
                  <span className="text-blue-500 hover:text-blue-400 m-1">
                    {UserData.referrer_info.name}
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
