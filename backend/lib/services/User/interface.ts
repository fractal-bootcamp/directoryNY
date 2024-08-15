import type { User } from "@prisma/client";



export interface IUserService {
    getAllUsers(): Promise<User[]>
    getUserById(userId: string): Promise<User | null>
    createUser(newUser: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
    updateUser(updatedUser: User): Promise<User>
    deleteUser(userId: string): Promise<User>
    getUserByFirebaseId(firebaseId: string): Promise<User | null>
}