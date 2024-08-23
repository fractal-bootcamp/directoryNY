import { IUserListingService } from "./interface";
import type { UserListing } from "@prisma/client";
import prisma from "../../../prisma/client";

export const UserListingService = (): IUserListingService => ({
  getUserListingById: async (userListingId) => {
    const userListing = await prisma.userListing.findUnique({
      where: {
        id: userListingId,
      },
      include: {
        User: {
          include: {
            referredByUser: true,
          },
        },
      },
    });
    if (!userListing) return null;
    return {
      ...userListing,
      User: {
        ...userListing.User,
        referredByUser: userListing.User.referredByUser || undefined,
      },
    };
  },

  getAllUserListings: async () => {
    const userListings = await prisma.userListing.findMany({
      include: {
        User: {
          include: {
            referredByUser: true,
          },
        },
      },
    });
    return userListings.map((listing) => ({
      ...listing,
      User: {
        ...listing.User,
        referredByUser: listing.User.referredByUser || undefined,
      },
    }));
  },

  createUserListing: async (newUserListing) => {
    if (newUserListing.website) {
      if (!newUserListing.website.startsWith("https://")) {
        newUserListing.website = "https://" + newUserListing.website;
      }
    }
    const userListing = await prisma.userListing.create({
      data: newUserListing,
    });
    return userListing;
  },

  updateUserListing: async (updatedUserListingId, updatedUserListing) => {
    const userListing = await prisma.userListing.update({
      where: {
        id: updatedUserListingId,
      },
      data: updatedUserListing,
    });
    return userListing;
  },

  deleteUserListing: async (userListingId) => {
    const userListing = await prisma.userListing.delete({
      where: {
        id: userListingId,
      },
    });
    return userListing;
  },
});
