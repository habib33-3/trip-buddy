/*
  Warnings:

  - You are about to drop the column `order` on the `Location` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Itinerary" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "order";
