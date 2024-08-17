import { UserListing, User } from "@prisma/client"

type UserWithReferredByUser = User & {
    referredByUser?: User
}

type UserListingDisplayData = UserListing & {
    User: UserWithReferredByUser
}

export interface IUserListingService {
    getUserListingById(userListingId: string): Promise<UserListingDisplayData | null>
    getAllUserListings(): Promise<UserListingDisplayData[]>
    createUserListing(newUserListing: Omit<UserListing, "id">): Promise<UserListing>
    updateUserListing(updatedUserListingId: string, updatedUserListing: Omit<UserListing, "id" | "createdAt" | "updatedAt">): Promise<UserListing>
    deleteUserListing(userListingId: string): Promise<UserListing>
}
