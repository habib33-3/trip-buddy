-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "formattedAddress" TEXT,
ALTER COLUMN "order" DROP NOT NULL;
