/*
  Warnings:

  - You are about to drop the column `referredUser` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `referral` table. All the data in the column will be lost.
  - You are about to drop the column `referredId` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_referredId_fkey";

-- AlterTable
ALTER TABLE "referral" DROP COLUMN "referredUser",
DROP COLUMN "status",
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "referredUserId" TEXT,
ADD COLUMN     "usageLimit" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "referredId",
ADD COLUMN     "referredbyId" TEXT;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referredbyId_fkey" FOREIGN KEY ("referredbyId") REFERENCES "referral"("id") ON DELETE SET NULL ON UPDATE CASCADE;
