import { User } from "../Users/types";

export type UserListingType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  leaselength: string;
  moveInTime: string;
  housematesCount: string;
  description: string;
  website?: string;
  phone?: string;
  email?: string;
};

export type UserWithReferredByUser = User & {
  referredByUser?: User;
};

export type UserListingDisplayData = UserListingType & {
  User: UserWithReferredByUser;
};

export type UserListingInput = Omit<
  UserListingType,
  "id" | "createdAt" | "updatedAt"
>;
