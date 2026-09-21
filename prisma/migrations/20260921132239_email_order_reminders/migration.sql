-- CreateTable
CREATE TABLE "EmailOrderReminder" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "kind" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailOrderReminder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailOrderReminder_orderId_dueDate_kind_recipient_key" ON "EmailOrderReminder"("orderId", "dueDate", "kind", "recipient");

-- AddForeignKey
ALTER TABLE "EmailOrderReminder" ADD CONSTRAINT "EmailOrderReminder_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
