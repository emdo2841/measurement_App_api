-- Reconcile database features that existed before they were recorded
-- correctly in Prisma migration history.

ALTER TABLE "users"
ADD COLUMN IF NOT EXISTS "emailVerifiedAt" TIMESTAMP(3);

CREATE TABLE IF NOT EXISTS "registration_verifications" (
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

    CONSTRAINT "registration_verifications_pkey"
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS
"registration_verifications_email_key"
ON "registration_verifications"("email");

CREATE UNIQUE INDEX IF NOT EXISTS
"registration_verifications_registrationTokenHash_key"
ON "registration_verifications"("registrationTokenHash");

CREATE TABLE IF NOT EXISTS "measurement_shares" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "measurementId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurement_shares_pkey"
    PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS
"measurement_shares_tokenHash_key"
ON "measurement_shares"("tokenHash");

CREATE INDEX IF NOT EXISTS
"measurement_shares_measurementId_idx"
ON "measurement_shares"("measurementId");

CREATE INDEX IF NOT EXISTS
"measurements_clientId_idx"
ON "measurements"("clientId");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname =
          'measurement_shares_measurementId_fkey'
    ) THEN
        ALTER TABLE "measurement_shares"
        ADD CONSTRAINT
          "measurement_shares_measurementId_fkey"
        FOREIGN KEY ("measurementId")
        REFERENCES "measurements"("id")
        ON DELETE CASCADE
        ON UPDATE CASCADE;
    END IF;
END
$$;
