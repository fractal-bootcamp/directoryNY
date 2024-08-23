import { User } from "../Users/types";

export type SpaceListing = {
  id: string;
  createdAt: string;
  updatedAt: string;
  user_id: string;
  name: string;
  description: string;
  location: string;
  housemates: string;
  priceRange: string;
  website?: string;
  image?: string;
  phone?: string;
  email?: string;
  // twitter_url?: string;
  // twitter_handle: string;
  // referrer_image?: string;
  // referrer_name: string;
  // referrer_twitter_url: string;
};

export type UserWithReferredByUser = User & {
  referredByUser?: User;
};

export type SpaceListingDisplayData = SpaceListing & {
  User: UserWithReferredByUser;
};

export type SpaceListingInput = Omit<
  SpaceListing,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "twitter_url"
  | "referrer_image"
  | "referrer_twitter_url"
  | "twitter_handle"
  | "referrer_name"
>;
