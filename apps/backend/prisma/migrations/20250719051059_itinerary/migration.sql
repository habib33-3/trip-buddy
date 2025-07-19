/*
  Warnings:

  - You are about to drop the column `locationId` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Itinerary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placeId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_locationId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_tripId_fkey";

-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "locationId",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "formattedAddress" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "placeId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Location";

-- DropTable
DROP TABLE "Place";

-- CreateIndex
CREATE INDEX "Itinerary_tripId_idx" ON "Itinerary"("tripId");
