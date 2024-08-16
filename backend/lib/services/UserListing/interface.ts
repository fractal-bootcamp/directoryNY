import { UserListing } from "@prisma/client";

export interface IUserListingService {
  getUserListingById(userListingId: string): Promise<UserListing | null>;
  getAllUserListings(): Promise<UserListing[]>;
  createUserListing(
    newUserListing: Omit<UserListing, "id">
  ): Promise<UserListing | null>;
  updateUserListing(updatedUserListing: UserListing): Promise<UserListing>;
  deleteUserListing(userListingId: string): Promise<UserListing>;
  getOneUserListing(userId: string): Promise<UserListing | null>;
}
