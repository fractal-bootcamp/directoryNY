import admin from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import prisma from "../prisma/client";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../lib/services/User/service";
import { User } from "@prisma/client";

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : {};

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
});

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  const details = await auth.verifyIdToken(token);
  const userdetails = await auth.getUser(details.uid);
  //   todo: add userdetails to req
  console.log("userdetails: ", userdetails);

  req["userFirebaseId"] = details.uid;
  req["userTwitterDetails"] = {
    displayName: userdetails.displayName
      ? userdetails.displayName
      : "A Twitter Friend",
    profilePicture: userdetails.photoURL
      ? userdetails.photoURL
      : "https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/f068d325-7a1f-4b06-a3ce-9cd8bab3f632/DALLE_2024-01-26_18.29.54_-_Create_a_highly_simplified_and_minimalist_pixelated_vector_illustration_of_a_1990s_computer_setup_inspired_by_Susan_Kares_iconic_design_style._The_i/w=256,quality=90,fit=scale-down",
  };
  next();
};

// add middleware that if the user doesn't exist,
// create them, and pass the user id into req.user

// if they do exist, pass the user id from our database into req.user

export const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const firebaseId = req.userFirebaseId;
  if (!firebaseId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await UserService().getUserByFirebaseId(firebaseId);

    if (user) {
      req["user"] = user;
      next();
    } else {
      // User doesn't exist, create a new user
      const newUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
        displayName: req.userTwitterDetails.displayName,
        profilePicture: req.userTwitterDetails.profilePicture,
        twitterHandle: "@fractaltechnyc",
        referredId: null,
        firebaseId: firebaseId,
      };
      const createdUser = await UserService().createUser(newUser);
      req["user"] = createdUser;
      next();
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const IsReferredUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (user.referredId) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const auth = getAuth(app);

export default auth;
