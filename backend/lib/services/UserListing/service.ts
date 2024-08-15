import { IUserListingService } from "./interface";
import type { UserListing } from "@prisma/client";
import prisma from '../../../prisma/client'

export const UserListingService = (): IUserListingService => ({
    getUserListingById: async (userListingId) => {
        const userListing = await prisma.userListing.findUnique({
            where: {
                id: userListingId
            }
        })
        return userListing
    },
    getAllUserListings: async () => {
        const userListings = await prisma.userListing.findMany()
        return userListings
    },
    createUserListing: async (newUserListing) => {
        const userListing = await prisma.userListing.create({
            data: newUserListing
        })
        return userListing
    },
    updateUserListing: async (updatedUserListing) => {
        const { id, ...updateData } = updatedUserListing

        const userListing = await prisma.userListing.update({
            where: {
                id
            },
            data: updateData
        })
        return userListing

    },
    deleteUserListing: async (userListingId) => {
        const userListing = await prisma.userListing.delete({
            where: {
                id: userListingId
            }
        })
        return userListing
    }
})