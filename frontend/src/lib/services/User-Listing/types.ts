import { User } from "../users/types";

export type UserListingType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  user_id: string;
  leaselength: string;
  moveInTime: string;
  housematesCount: string;
  description: string;
  website: string | null;
  phone: string | null;
  email: string | null;
};

export type UserListingInput = Omit<
  UserListingType,
  "id" | "createdAt" | "updatedAt"
>;

export type UserListingProps = {
  UserListingData: UserListingType;
  UserData: User;
  ReferrerData: User;
};
