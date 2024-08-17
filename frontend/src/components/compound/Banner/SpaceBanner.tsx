import { useEffect, useState } from "react";
import { UserService } from "../../../lib/services/Users/service";
import SpaceListingService from "../../../lib/services/Space-Listing/service";
import { SpaceListing } from "../../../lib/services/Space-Listing/types";
import { User } from "../../../lib/services/Users/types";
import { SpaceListingCreateForm } from "../SpaceListingCreateForm";

const SpaceBanner = () => {

  const userService = UserService();
  const [userSpaceListings, setUserSpaceListings] = useState<SpaceListing[]>([]);

  const [currentUser, setCurrentUser] = useState<User>()

  useEffect(() => {
    const fetchUserAndListings = async () => {
      try {
        const userResponse = await userService.getCurrentUser();
        if (!userResponse.data) return;
        setCurrentUser(userResponse.data);
        if (userResponse.data) {
          const listingsResponse = await SpaceListingService().getAll();
          if (listingsResponse.data) {
            const userListings = listingsResponse.data?.filter(
              listing => listing.user_id === userResponse.data?.id
            ) ?? [];
            setUserSpaceListings(userListings);
          }
        }
        else {
          throw new Error("Error fetching current user")
        }
      } catch (error) {
        console.error("Error fetching user and space listings:", error);
      }
    };

    fetchUserAndListings();
  }, []);

  const [createFormVisible, setCreateFormVisible] = useState(false)

  const handleCreateSpaceClick = () => {
    setCreateFormVisible(!createFormVisible)
  }

  return (
    <div className="flex flex-col p-4 border border-2 rounded-lg bg-[#F7FCEF] gap-2 m-6">
      <div className="text-md lg:text-base font-bold">
        🏡 Have a co-living space, sublet, or vacant room?
      </div>
      <div className="text-sm lg:text-base ">
        Add your space to be discovered by people looking for housing.
      </div>

      {currentUser && (
        userSpaceListings.length > 0 ? (
          <EditSpaceArea />
        ) : (
          <>
            <SpaceListingCreateButton
              clickHandler={handleCreateSpaceClick}
              isFormVisible={createFormVisible}
            />
            {createFormVisible && <SpaceListingCreateForm onSuccess={handleCreateSpaceClick} />}
          </>
        )
      )}
    </div>
  );
};


const SpaceListingCreateButton = ({
  clickHandler,
  isFormVisible
}: {
  clickHandler: () => void,
  isFormVisible: boolean
}) => {
  return (
    <button
      onClick={clickHandler}
      className="bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      {isFormVisible ? 'Close form' : 'Add your space'}
    </button>
  )
}


const EditSpaceArea = () => {
  return (
    <div>
      Edit your listing
    </div>
  )
}


export default SpaceBanner;