import { IUserListingService } from "./interface";
import type { UserListing } from "@prisma/client";
import prisma from "../../../prisma/client";

export const UserListingService = (): IUserListingService => ({
  getUserListingById: async (userListingId) => {
    const userListing = await prisma.userListing.findUnique({
      where: {
        id: userListingId,
      },
    });
    return userListing;
  },
  getOneUserListing: async (userId) => {
    console.log("help here");
    const userListing = await prisma.userListing.findFirst({
      where: {
        user_id: userId,
      },
    });
    return userListing;
  },
  getAllUserListings: async () => {
    const userListings = await prisma.userListing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return userListings;
  },
  createUserListing: async (newUserListing) => {
    // Check if the user already has a user listing
    const existingListing = await prisma.userListing.findMany({
      where: {
        user_id: newUserListing.user_id,
      },
    });

    if (existingListing.length > 0) {
      return null;
    } else {
      const userListing = await prisma.userListing.create({
        data: newUserListing,
      });
      return userListing;
    }
  },
  updateUserListing: async (updatedUserListing) => {
    const { id, ...updateData } = updatedUserListing;

    const userListing = await prisma.userListing.update({
      where: {
        id,
      },
      data: updateData,
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
