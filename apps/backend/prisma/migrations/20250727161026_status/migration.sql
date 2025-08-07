-- DropForeignKey
ALTER TABLE "Itinerary" DROP CONSTRAINT "Itinerary_placeId_fkey";

-- AddForeignKey
ALTER TABLE "Itinerary" ADD CONSTRAINT "Itinerary_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
