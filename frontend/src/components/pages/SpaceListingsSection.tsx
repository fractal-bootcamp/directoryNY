import { useEffect, useState, useCallback } from "react";
import { SpaceListing } from "../../lib/services/Space-Listing/types";
import SpaceListingService from "../../lib/services/Space-Listing/service";
import SpaceListingCard from "../compound/SpaceListing";
import SpaceBanner from "../compound/Banner/SpaceBanner";

export default function SpaceListingSection() {
  const [spaceListings, setSpaceListings] = useState<Array<SpaceListing>>([]);

  const currentDate = new Date();

  const fetchListings = useCallback(() => {
    SpaceListingService()
      .getAll()
      .then((listings) => {
        console.log("Fetched listings:", listings.data);
        setSpaceListings(listings.data);
      });
  }, []);

  useEffect(() => {
    fetchListings();
  }, [fetchListings]);

  const handleListingsChanged = () => {
    fetchListings();
  };

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

  return (
    <>
      <SpaceBanner
        handleListingsChanged={handleListingsChanged}
        spaceListings={spaceListings}
      />

      {POSTING_TIME_FRAMES.map((frame) => (
        <>
          <div className="font-bold text-2xl pl-2 mt-4">
            {frame[0] as string}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-primary ">
            {/* {console.log("helloo1", frame[0])}
          <div className="font-bold text-2xl pl-2 mt-4">
            {frame[0] as string}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-primary p-6"> */}
            {spaceListings
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
              .map((listing) => (
                <>
                  {console.log("helloo2", listing)}
                  <SpaceListingCard key={listing.id} SpaceData={listing} />
                </>
              ))}
          </div>
        </>
      ))}
    </>
  );
}
