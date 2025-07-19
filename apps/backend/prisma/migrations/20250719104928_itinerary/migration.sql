/*
  Warnings:

  - You are about to drop the column `address` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `Itinerary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "address",
DROP COLUMN "placeId";
