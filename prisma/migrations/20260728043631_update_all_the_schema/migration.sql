/*
  Warnings:

  - You are about to drop the column `client_name` on the `measurements` table. All the data in the column will be lost.
  - You are about to drop the column `client_phone` on the `measurements` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `measurements` table. All the data in the column will be lost.
  - The `unit` column on the `measurements` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `title` to the `measurements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('CM', 'INCHES');

-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_tailorId_fkey";

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "image" TEXT,
ALTER COLUMN "tailorId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "measurements" DROP COLUMN "client_name",
DROP COLUMN "client_phone",
DROP COLUMN "value",
ADD COLUMN     "title" TEXT NOT NULL,
DROP COLUMN "unit",
ADD COLUMN     "unit" "Unit" NOT NULL DEFAULT 'INCHES';

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_tailorId_fkey" FOREIGN KEY ("tailorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
