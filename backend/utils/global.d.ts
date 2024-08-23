import { User, Referral } from "@prisma/client";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      userFirebaseId?: string;
      userTwitterDetails: {
        displayName: string;
        profilePicture: string;
      };
      user: User;
      referral: Referral;
    }
  }
}
