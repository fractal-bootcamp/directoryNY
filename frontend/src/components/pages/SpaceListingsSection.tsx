import { useEffect, useState, useCallback } from "react";
import { SpaceListing } from "../../lib/services/Space-Listing/types";
import SpaceListingService from "../../lib/services/Space-Listing/service";
import SpaceListingCard from "../compound/SpaceListing";
import SpaceBanner from "../compound/Banner/SpaceBanner";

export default function SpaceListingSection() {
  const [spaceListings, setSpaceListings] = useState<Array<SpaceListing>>([]);
  const currentDate = new Date();

  const [leaselengthpreference, setLeaselengthpreference] = useState("Any lease");
  const [leaseroommatereference, setLeaseroommatereference] = useState("Any count");
  const [leasetimingpreference, setLeasetimingpreference] = useState("Any timeline");

  const fetchListings = useCallback(() => {
    SpaceListingService().getAll().then((listings) => {
      console.log('Fetched listings:', listings.data);
      setSpaceListings(listings.data);
    });
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleListingAdded = () => {
    fetchListings();
  }

  function adj_date(number: number) {
    const current_copy = new Date(currentDate.valueOf());
    current_copy.setDate(current_copy.getDate() - number);
    return current_copy;
  }

  const POSTING_TIME_FRAMES: [string, Date, Date][] = [
    ["Today", adj_date(0), adj_date(1)],
    ["This Week", adj_date(1), adj_date(7)],
    ["This Month", adj_date(7), adj_date(31)],
    ["Older", adj_date(31), new Date(0)],
  ];

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
        value={selected}
        onChange={changeHandler}
        defaultValue={defaultval}
        className="flex h-10 w-full items-center justify-between rounded-md border border-neutral-200 bg-[#FFFDF3] px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-white"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  return (
    <>
      <SpaceBanner onListingAdded={handleListingAdded} />
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-between w-full">
          <SelectFilter
            name="leaseLength"
            options={["Any lease", "Short-term", "Long-term"]}
            changeHandler={(e) => setLeaselengthpreference(e.target.value)}
            selected={leaselengthpreference}
            defaultval="Any lease"
          />
          <SelectFilter
            name="leaseRoommate"
            options={["Any count", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
            changeHandler={(e) => setLeaseroommatereference(e.target.value)}
            selected={leaseroommatereference}
            defaultval="Any count"
          />
          <SelectFilter
            name="leaseTiming"
            options={POSTING_TIME_FRAMES.map(([label]) => label as string)}
            changeHandler={(e) => setLeasetimingpreference(e.target.value)}
            selected={leasetimingpreference}
            defaultval="Any timeline"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {spaceListings.map((listing) => (
            <SpaceListingCard
              key={listing.id}
              SpaceData={listing}
              onListingAdded={handleListingAdded}
            />
          ))}
        </div>
      </div>
    </>
  );
}