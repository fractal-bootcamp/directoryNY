import { IUserService } from "./interface";
import type { User } from "@prisma/client";
import prisma from '../../../prisma/client'

export const UserService = (): IUserService => ({
    getAllUsers: async () => {
        const users = await prisma.user.findMany()
        return users
    },
    getUserById: async (userId) => {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return user
    },
    createUser: async (newUser) => {
        const user = await prisma.user.create({
            data: {
                displayName: newUser.displayName,
                profilePicture: newUser.profilePicture,
                twitterHandle: newUser.twitterHandle,
                firebaseId: newUser.firebaseId,
                active: newUser.active || false
            }
        })
        return user
    },
    updateUser: async (updatedUser) => {
        const { id, ...updateData } = updatedUser
        if (!id) {
            throw new Error("User ID is required for update");
        }
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: updateData
        })
        return user
    },
    deleteUser: async (userId) => {
        const user = await prisma.user.delete({
            where: {
                id: userId
            }
        })
        return user
    },
    getUserByFirebaseId: async (firebaseId) => {
        const user = await prisma.user.findUnique({
            where: {
                firebaseId: firebaseId
            }
        })
        return user
    }
})