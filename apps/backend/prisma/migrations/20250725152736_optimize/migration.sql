/*
  Warnings:

  - Made the column `formattedAddress` on table `Place` required. This step will fail if there are existing NULL values in that column.
  - Made the column `initials` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "formattedAddress" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "initials" SET NOT NULL;
