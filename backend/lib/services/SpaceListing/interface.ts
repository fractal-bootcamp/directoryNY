import { SpaceListing } from '@prisma/client';


type SpaceListingInput = Omit<SpaceListing, 'id' | 'createdAt' | 'updatedAt'>

export interface ISpaceListingService {
    getAllSpaceListings(): Promise<SpaceListing[]>
    getSpaceListingById(spaceListingId: string): Promise<SpaceListing | null>
    createSpaceListing(newSpaceListing: SpaceListing): Promise<SpaceListing>
    updateSpaceListing(updatedSpaceListingId: string, updatedSpaceListing: SpaceListingInput): Promise<SpaceListing>
    deleteSpaceListing(spaceListingId: string): Promise<SpaceListing>
}
