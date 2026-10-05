/*
  Warnings:

  - You are about to drop the column `verificationTokenExpiry` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationTokenHash` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_verificationTokenHash_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "verificationTokenExpiry",
DROP COLUMN "verificationTokenHash";

-- CreateTable
CREATE TABLE "registration_verifications" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "codeExpiresAt" TIMESTAMP(3) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "verifiedAt" TIMESTAMP(3),
    "registrationTokenHash" TEXT,
    "registrationTokenExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_verifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_verifications_email_key" ON "registration_verifications"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registration_verifications_registrationTokenHash_key" ON "registration_verifications"("registrationTokenHash");
