import { Response, IUserService, User } from "./types";
import api, { EP } from "../../../../network/api";

export const UserService = (): IUserService => ({
  getAll: (): Response<User[]> => api.get(EP.users.getAllUsers),
  getById: (userId: string): Response<User> =>
    api.get(EP.users.getUserById(userId)),
  create: (user: User): Response<User> => api.post(EP.users.createUser, user),
  update: (userId: string, user: User): Response<User> =>
    api.put(EP.users.updateUser(userId), user),
  delete: (userId: string): Response<User> =>
    api.delete(EP.users.deleteUser(userId)),
  getCurrentUser: (): Response<User | null> => api.get(EP.users.getCurrentUser),
});
