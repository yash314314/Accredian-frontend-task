/*
  Warnings:

  - You are about to drop the column `email` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Referral` table. All the data in the column will be lost.
  - You are about to drop the column `referredBy` on the `Referral` table. All the data in the column will be lost.
  - Added the required column `refereeEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refereeName` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerEmail` to the `Referral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referrerName` to the `Referral` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Referral_email_key";

-- AlterTable
ALTER TABLE "Referral" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "phone",
DROP COLUMN "referredBy",
ADD COLUMN     "refereeEmail" TEXT NOT NULL,
ADD COLUMN     "refereeName" TEXT NOT NULL,
ADD COLUMN     "referrerEmail" TEXT NOT NULL,
ADD COLUMN     "referrerName" TEXT NOT NULL;
