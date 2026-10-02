-- CreateTable
CREATE TABLE "measurement_shares" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "measurementId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurement_shares_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "measurement_shares_tokenHash_key" ON "measurement_shares"("tokenHash");

-- CreateIndex
CREATE INDEX "measurement_shares_measurementId_idx" ON "measurement_shares"("measurementId");

-- AddForeignKey
ALTER TABLE "measurement_shares" ADD CONSTRAINT "measurement_shares_measurementId_fkey" FOREIGN KEY ("measurementId") REFERENCES "measurements"("id") ON DELETE CASCADE ON UPDATE CASCADE;
