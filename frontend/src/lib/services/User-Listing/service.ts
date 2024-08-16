import api, { EP } from "../../../../network/api";
import { UserListingType, UserListingInput } from "./types";

type Response<T> = Promise<{ data: T; error: string }>;

const UserListingService = () => ({
  create: (userListing: UserListingInput): Response<UserListingType> =>
    api.post(EP.userlistings.createListing, userListing),
  // get current users userlisting
  getCurrentUserListing: (): Response<UserListingType> =>
    api.get(EP.userlistings.getCurrentUserListing),

  getById: (userlistingId: string): Response<UserListingType> =>
    api.get(EP.userlistings.getUserListingById(userlistingId)),

  getAll: (): Response<UserListingType[]> =>
    api.get(EP.userlistings.getAllUserListings),

  update: (
    userlistingId: string,
    userListing: Partial<UserListingInput>
  ): Response<UserListingType> =>
    api.put(EP.userlistings.updateUserListing(userlistingId), userListing),

  delete: (userListingId: string): Response<UserListingType> =>
    api.delete(EP.userlistings.deleteUserListing(userListingId)),
});

export default UserListingService;
