export type UserListingType = {
  contact: {
    twitter_handle: string;
    twitter_url: string;
    contact_number?: string;
    email?: string;
  };
  name: string;
  twitter_photo_url: string;
  description: string;
  lease_preference: string;
  lease_timing: string;
  post_datetime: string;
  referrer_info: {
    name: string;
    twitter_url: string;
    twitter_photo_url: string;
  };
};
export type UserListingProps = {
  UserData: UserListingType;
};

export type RoomListingType = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  housemates: string;
  priceRange: string;
  website?: string;
  image?: string;
  phone?: string;
  email?: string;
};

export type RoomListingProps = { RoomData: RoomListingType };
