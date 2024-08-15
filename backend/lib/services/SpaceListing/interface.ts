import { SpaceListing } from '@prisma/client';


export interface ISpaceListingService {
    getAllSpaceListings(): Promise<SpaceListing[]>
    getSpaceListingById(spaceListingId: string): Promise<SpaceListing | null>
    createSpaceListing(newSpaceListing: SpaceListing): Promise<SpaceListing>
    updateSpaceListing(updatedSpaceListing: SpaceListing): Promise<SpaceListing>
    deleteSpaceListing(spaceListingId: string): Promise<SpaceListing>
}
