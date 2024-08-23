import { ISpaceListingService } from "./interface";
import type { SpaceListing } from "@prisma/client";
import prisma from "../../../prisma/client";

export const SpaceListingService = (): ISpaceListingService => ({
  getSpaceListingById: async (spaceListingId) => {
    const spaceListing = await prisma.spaceListing.findUnique({
      where: {
        id: spaceListingId,
      },
    });
    return spaceListing;
  },
  getAllSpaceListings: async () => {
    const spaceListings = await prisma.spaceListing.findMany({
      include: {
        User: {
          include: {
            referredByUser: true,
          },
        },
      },
    });
    return spaceListings.map((listing) => ({
      ...listing,
      User: {
        ...listing.User,
        referredByUser: listing.User.referredByUser || undefined,
      },
    }));
  },
  createSpaceListing: async (newSpaceListing) => {
    console.log("newSpaceListing.website", newSpaceListing.website);
    if (newSpaceListing.website) {
      if (!newSpaceListing.website.startsWith("https://")) {
        console.log("adding prefix");
        newSpaceListing.website = "https://" + newSpaceListing.website;
      }
    }
    const spaceListing = await prisma.spaceListing.create({
      data: newSpaceListing,
    });
    return spaceListing;
  },
  updateSpaceListing: async (updatedSpaceListingId, updatedSpaceListing) => {
    console.log("updatespacelisting", updatedSpaceListing.website);
    if (updatedSpaceListing.website) {
      if (!updatedSpaceListing.website.startsWith("https://")) {
        console.log("adding prefix");
        updatedSpaceListing.website = "https://" + updatedSpaceListing.website;
      }
    }
    const spaceListing = await prisma.spaceListing.update({
      where: {
        id: updatedSpaceListingId,
      },
      data: updatedSpaceListing,
    });
    return spaceListing;
  },
  deleteSpaceListing: async (spaceListingId) => {
    const spaceListing = await prisma.spaceListing.delete({
      where: {
        id: spaceListingId,
      },
    });
    return spaceListing;
  },
});
