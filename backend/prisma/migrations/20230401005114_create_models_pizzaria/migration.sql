-- AlterTable
ALTER TABLE "items" ADD COLUMN     "create_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "update_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;
