-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_tailorId_fkey";

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_tailorId_fkey" FOREIGN KEY ("tailorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
