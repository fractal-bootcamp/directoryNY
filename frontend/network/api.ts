import axios from "axios";
import { getAuth } from "firebase/auth";

export const EP = {
  listings: {
    createListing: "/space-listings/create",
    getAllListings: "/space-listings/all",
    getListingByUserId: (userId: string) => `/space-listings/${userId}`,
    getListingById: (listingId: string) => `/space-listings/${listingId}`,
    updateListing: (listingId: string) => `/space-listings/${listingId}`,
    deleteListing: (listingId: string) => `/space-listings/${listingId}`,
  },
  userlistings: {
    createListing: "/user-listings/create",
    getAllUserListings: "/user-listings/all",
    getUserListingByUserId: (userId: string) => `/user-listings/${userId}`,
    getUserListingById: (userlistingId: string) =>
      `/user-listings/${userlistingId}`,
    updateUserListing: (userlistingId: string) =>
      `/user-listings/${userlistingId}`,
    deleteUserListing: (userlistingId: string) =>
      `/user-listings/${userlistingId}`,
  },
  referrals: {
    getReferralCode: (userId: string) => `/referral/code/${userId}`,
    applyReferralCode: "/referral/apply",
    getReferralStatus: (referralId: string) => `/referral/status/${referralId}`
  },
  users: {
    getAllUsers: "/users/all",
    getUserById: (userId: string) => `/users/${userId}`,
    createUser: `/users/new`,
    updateUser: (userId: string) => `/users/${userId}`,
    deleteUser: (userId: string) => `/users/${userId}`,
  },
};
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    // add firebase token to header
    "Content-Type": "application/json",
  },
});



api.interceptors.request.use(async (config) => {
  const auth = getAuth();
  const user = auth.currentUser;
  let token = null;

  if (user) {
    try {
      token = await user.getIdToken();
      console.log("Firebase token obtained successfully");
      console.log("token", token)
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  } else {
    console.log("No current user found");
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization header set");
  } else {
    console.log("No token available, request will be unauthorized");
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// Referral-related API functions
export const referralApi = {
  getReferralCode: (userId: string) => api.get(EP.referrals.getReferralCode(userId)),
  applyReferralCode: (newUserId: string, referralCode: string) =>
    api.post(EP.referrals.applyReferralCode, { newUserId, referralCode }),
  getReferralStatus: (referralId: string) => api.get(EP.referrals.getReferralStatus(referralId))
}

export default api;