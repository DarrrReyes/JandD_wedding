/*
  Warnings:

  - You are about to drop the column `description` on the `guest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "guest" DROP COLUMN "description",
ADD COLUMN     "remarks" TEXT;
