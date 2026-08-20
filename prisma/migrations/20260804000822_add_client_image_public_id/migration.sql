/*
  Warnings:

  - You are about to drop the column `note` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "note",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "imagePublicId" TEXT;
