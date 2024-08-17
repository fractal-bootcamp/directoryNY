//import FilterSection from "../compound/FilterSection";
import UserListing from "../compound/UserListing";
import { useCallback, useEffect, useState } from "react";
// import { UserListingProps, UserListingType } from "../types";
import { UserListingDisplayData } from "../../lib/services/User-Listing/types";
import UserListingService from "../../lib/services/User-Listing/service";
import { LeaseLength, RoommateCount, MovingTimeline } from "./types";


import ProfileBanner from "../compound/Banner/ProfileBanner";

// type UserPreference = Pick<
//   UserListingType,
//   | "lease_length_preference"
//   | "lease_timing_preference"
//   | "lease_roommates_preference"
// >;

export default function PeopleListingSection() {
  const [userlistings, setuserListings] = useState<Array<UserListingDisplayData>>([]);
  const currentDate = new Date();

  console.log("people section");
  console.log("userlistingservice");
  const fetchListings = useCallback(() => {
    UserListingService()
      .getAll()
      .then((listings) => {
        console.log("listings", listings.data);
        setuserListings(listings.data);
      });
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleListingAdded = () => {
    fetchListings();
  };

  const default_values: [string, string, string] = [
    "Any lease",
    "Any count",
    "Any timeline",
  ];
  const [leaselengthpreference, setLeaselengthpreference] = useState(
    default_values[0]
  );
  const [leaseroommatereference, setLeaseroommatereference] = useState(
    default_values[1]
  );
  const [leasetimingpreference, setLeasetimingpreference] = useState(
    default_values[2]
  );

  console.log(userlistings);
  function adj_date(number: number) {
    const current_copy = new Date(currentDate.valueOf());
    current_copy.setDate(current_copy.getDate() - number);
    return current_copy;
  }

  const POSTING_TIME_FRAMES = [
    ["Today", adj_date(0), adj_date(1)],
    ["This Week", adj_date(1), adj_date(7)],
    ["This Month", adj_date(7), adj_date(31)],
    ["Older", adj_date(31), new Date(0)],
  ];

  POSTING_TIME_FRAMES.map((frame) => {
    userlistings
      .sort((a, b) =>
        a.createdAt > b.createdAt ? 1 : b.createdAt > a.createdAt ? -1 : 0
      )
      .filter((f) => {
        console.log(new Date(f.createdAt), frame);
        console.log(
          new Date(f.createdAt) <= frame[1],
          new Date(f.createdAt) > frame[2]
        );
        return (
          new Date(f.createdAt) <= frame[1], new Date(f.createdAt) > frame[2]
        );
      })
      .map((listing) => {
        console.log("listing", listing);
        return listing;
      });
  });

  const SelectFilter = ({
    name,
    options,
    changeHandler,
    selected,
    defaultval,
  }: {
    name: string;
    options: Array<string>;
    selected: string;
    defaultval: string;
    changeHandler: React.ChangeEventHandler<HTMLSelectElement>;
  }) => {
    return (
      <select
        // type="button"
        role="combobox"
        aria-controls="radix-:r2nu:"
        aria-expanded="false"
        aria-autocomplete="none"
        dir="ltr"
        data-state="closed"
        data-placeholder=""
        value={selected}
        onChange={changeHandler}
        defaultValue={defaultval}
        className="flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-[#FFFDF3] px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;>span]:line-clamp-1  "
      >
        <option disabled selected>
          {name}
        </option>
        {options.map((opt) => (
          <option>{opt}</option>
        ))}
        <span>{name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="h-4 w-4 opacity-50"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </select>
    );
  };
  return (
    <>
      <ProfileBanner onListingAdded={handleListingAdded} />

      {/* <div className="flex flex-col gap-4 mb-4"> */}
      <div className="flex flex-row gap-2 grow">
        <div className="flex flex-col gap-2 grow">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="Preferences"
          >
            Preference Filters
          </label>
          <div className="flex flex-row gap-2">
            <SelectFilter
              name="Lease length"
              options={[...Object.values(LeaseLength), default_values[0]]}
              selected={leaselengthpreference}
              defaultval={default_values[0]}
              changeHandler={(e) => setLeaselengthpreference(e.target.value)}
            />
            <SelectFilter
              name="Housemate Count"
              options={[...Object.values(RoommateCount), default_values[1]]}
              defaultval={default_values[1]}
              selected={leaseroommatereference}
              changeHandler={(e) => setLeaseroommatereference(e.target.value)}
            // defaultval="Any count"
            />

            <div
              data-orientation="vertical"
              role="none"
              className="shrink-0 bg-neutral-200 w-[1px] hidden sm:inline h-auto"
            ></div>
          </div>
        </div>
        <div className="flex flex-col gap-2 grow">
          <label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="Timeline"
          >
            Timeline
          </label>
          <SelectFilter
            name="Moving in..."
            options={[...Object.values(MovingTimeline), default_values[2]]}
            selected={leasetimingpreference}
            defaultval={default_values[2]}
            changeHandler={(e) => setLeasetimingpreference(e.target.value)}
          // defaultval="Any timeline"
          />
        </div>
        {/* </div> */}
      </div>

      {POSTING_TIME_FRAMES.map((frame) => (
        <>
          <div className="font-bold text-2xl pl-2 mt-4">
            {frame[0] as string}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary p-6">
            {userlistings
              .sort((a, b) =>
                a.createdAt > b.createdAt
                  ? 1
                  : b.createdAt > a.createdAt
                    ? -1
                    : 0
              )
              .filter(
                (f) =>
                  new Date(f.createdAt) <= frame[1] &&
                  new Date(f.createdAt) > frame[2]
              )
              .filter((f) => {
                // console.log(f.lease_roommates_preference);
                return (
                  (leaselengthpreference === default_values[0] ||
                    leaselengthpreference === f.leaselength) &&
                  (leaseroommatereference === default_values[1] ||
                    leaseroommatereference === f.housematesCount) &&
                  (leasetimingpreference === default_values[2] ||
                    leasetimingpreference === f.moveInTime)
                );
              })
              .map((listing) => (
                <UserListing key={listing.id} UserListingData={listing} />
              ))}
          </div>
        </>
      ))}
      {/* <TimeFrame /> */}
    </>
  );
}
