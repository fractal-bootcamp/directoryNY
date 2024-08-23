/*
  Warnings:

  - You are about to drop the column `referredUserId` on the `referral` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "referral" DROP COLUMN "referredUserId",
ALTER COLUMN "usageLimit" SET DEFAULT 5;
