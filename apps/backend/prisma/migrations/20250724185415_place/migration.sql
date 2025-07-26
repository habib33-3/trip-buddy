/*
  Warnings:

  - You are about to drop the column `city` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `formattedAddress` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Itinerary` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Itinerary` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Itinerary" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "formattedAddress",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "placeId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "formattedAddress" TEXT,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "Itinerary_tripId_idx" RENAME TO "trip_id_idx";
