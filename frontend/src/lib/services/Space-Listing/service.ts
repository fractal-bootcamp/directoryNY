import api, { EP } from "../../../../network/api"
import { SpaceListing, SpaceListingInput } from "./types"




type Response<T> = Promise<{ data: T; error: string }>;

const SpaceListingService = () => ({
    create: (spaceListing: SpaceListingInput): Response<SpaceListing> =>
        api.post(EP.listings.createListing, spaceListing),

    getById: (listingId: string): Response<SpaceListing> =>
        api.get(EP.listings.getListingById(listingId)),

    getAll: (): Response<SpaceListing[]> =>
        api.get(EP.listings.getAllListings),

    update: (listingId: string, spaceListing: Partial<SpaceListingInput>): Response<SpaceListing> =>
        api.put(EP.listings.updateListing(listingId), spaceListing),

    delete: (listingId: string): Response<SpaceListing> =>
        api.delete(EP.listings.deleteListing(listingId))
});

export default SpaceListingService;