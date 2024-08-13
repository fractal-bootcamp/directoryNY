import { useState } from "react"
import { useUserService } from "../../lib/services/users/service"

export const SpaceListingCard = () => {

    // const user = useUserService()
    const [hasCreatedSpace, setHasCreatedSpace] = useState(false)
    // if (user.createdSpaces.length > 0) {
    //     setHasCreatedSpace(true)
    // } // replace with real data

    const handleCreateSpaceClick = () => {
        setHasCreatedSpace(true)
        // update user data
    }


    return (
        <div>
            <div className="text-2xl font-bold p-4 border border-2 rounded-lg bg-[#EDFCDC] ">
                Have a co-living space, sublet, or vacant room?

            </div>

            {hasCreatedSpace && <CreateSpaceButton />}

        </div>
    )

}


const CreateSpaceButton = () => {
    return (
        <button>
            Add your space
        </button>
    )
}