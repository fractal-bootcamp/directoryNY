import { useEffect, useState } from "react"
import { UserService } from "../../lib/services/Users/service"
import { SpaceListing, SpaceListingInput } from "../../lib/services/Space-Listing/types"
import SpaceListingService from "../../lib/services/Space-Listing/service"
import { SpaceListingCreateForm } from "./SpaceListingCreateForm"
import SpaceBanner from "./Banner/SpaceBanner"
import { User } from "../../lib/services/Users/types"
import api, { EP } from "../../../network/api"

export const CreateSpaceListingArea = () => {

    const userService = UserService();
    const [userSpaceListings, setUserSpaceListings] = useState<SpaceListing[]>([]);

    const [currentUser, setCurrentUser] = useState<User>()



    useEffect(() => {
        const fetchUserAndListings = async () => {
            try {
                const userResponse = await userService.getCurrentUser();
                setCurrentUser(userResponse.data);
                if (userResponse.data && userResponse.data) {
                    const listingsResponse = await SpaceListingService().getAll();
                    if (listingsResponse.data && listingsResponse.data.listings) {
                        const userListings = listingsResponse.data.listings.filter(
                            listing => listing.user_id === userResponse.data.id
                        );
                        setUserSpaceListings(userListings);
                    }
                }
            } catch (error) {
                console.error("Error fetching user and space listings:", error);
            }
        };

        fetchUserAndListings();
    }, []);

    // const user = useUserService()
    const [createFormVisible, setCreateFormVisible] = useState(false)
    // if (user.createdSpaces.length > 0) {
    //     setHasCreatedSpace(true)
    // } // replace with real data

    const handleCreateSpaceClick = () => {
        setCreateFormVisible(true)
        // update user data
    }


    return (
        <div>
            <SpaceBanner />
            {currentUser ? (
                <div>
                    <p>Current User: {currentUser.id}</p>
                    {/* Add more user details as needed */}
                </div>
            ) : (
                "No user logged in"
            )}


        </div>
    )

}


const SpaceListingCreateButton = ({ clickHandler }: { clickHandler: () => void }) => {
    return (
        <button onClick={clickHandler}>
            Add your space
        </button>
    )
}



const EditSpaceArea = () => {
    return (
        <div>
            Edit
        </div>
    )
}