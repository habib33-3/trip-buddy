/*
  Warnings:

  - The values [IN_PROGRESS] on the enum `ItineraryStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [CONFIRMED] on the enum `TripStatus` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `city` on table `Place` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ItineraryStatus_new" AS ENUM ('UPCOMING', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Itinerary" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Itinerary" ALTER COLUMN "status" TYPE "ItineraryStatus_new" USING ("status"::text::"ItineraryStatus_new");
ALTER TYPE "ItineraryStatus" RENAME TO "ItineraryStatus_old";
ALTER TYPE "ItineraryStatus_new" RENAME TO "ItineraryStatus";
DROP TYPE "ItineraryStatus_old";
ALTER TABLE "Itinerary" ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TripStatus_new" AS ENUM ('PLANNED', 'ACTIVE', 'COMPLETED', 'CANCELLED');
ALTER TABLE "Trip" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Trip" ALTER COLUMN "status" TYPE "TripStatus_new" USING ("status"::text::"TripStatus_new");
ALTER TYPE "TripStatus" RENAME TO "TripStatus_old";
ALTER TYPE "TripStatus_new" RENAME TO "TripStatus";
DROP TYPE "TripStatus_old";
ALTER TABLE "Trip" ALTER COLUMN "status" SET DEFAULT 'PLANNED';
COMMIT;

-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_tripId_fkey";

-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_userId_fkey";

-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "city" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
