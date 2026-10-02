/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `measurements` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "measurement_history" (
    "id" TEXT NOT NULL,
    "measurementId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "unit" "Unit" NOT NULL,
    "data" JSONB NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurement_history_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "measurement_history_measurementId_idx" ON "measurement_history"("measurementId");

-- CreateIndex
CREATE UNIQUE INDEX "measurements_clientId_key" ON "measurements"("clientId");

-- AddForeignKey
ALTER TABLE "measurement_history" ADD CONSTRAINT "measurement_history_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "measurements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
