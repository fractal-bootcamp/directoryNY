import api, { EP } from "../../../../network/api";
import { UserListingType, UserListingInput, UserListingDisplayData } from "./types";

type Response<T> = Promise<{ data: T; error: string }>;

const UserListingService = () => ({
  create: (userListing: UserListingInput): Response<UserListingType> =>
    api.post(EP.userlistings.createListing, userListing),

  getById: (userlistingId: string): Response<UserListingDisplayData> =>
    api.get(EP.userlistings.getUserListingById(userlistingId)),

  getAll: (): Response<UserListingDisplayData[]> =>
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
