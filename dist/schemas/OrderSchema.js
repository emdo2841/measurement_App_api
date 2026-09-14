"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderSchema = exports.createOrderSchema = void 0;
const client_1 = require("../generated/prisma/client");
const zod_1 = require("zod");
// 1. Create Order Schema (for POST requests)
exports.createOrderSchema = zod_1.z.object({
    clientId: zod_1.z
        .uuid({ error: "Invalid Client ID format" }),
    status: zod_1.z
        .enum(client_1.OrderStatus, {
        error: () => ({ message: "Invalid status value" }),
    })
        .default(client_1.OrderStatus.PENDING),
    // Parses string ISO dates (e.g., "2026-08-15") from JSON/forms into JS Date
    dueDate: zod_1.z
        .coerce
        .date({ error: "Invalid date format" })
        .nullable()
        .optional(),
    // Coerces string numbers (e.g., "15000.50") into a Float number
    totalAmount: zod_1.z
        .coerce
        .number({ error: "Total amount must be a valid number" })
        .nonnegative("Total amount cannot be negative")
        .nullable()
        .optional(),
    notes: zod_1.z
        .string()
        .trim()
        .nullable()
        .optional()
        .or(zod_1.z.literal('')),
    image: zod_1.z
        .string()
        .url()
        .nullable()
        .optional()
        .or(zod_1.z.literal('')),
});
// 2. Update Order Schema (for PATCH/PUT requests)
// Makes all fields optional so you can update just the status or due date alone
exports.updateOrderSchema = exports.createOrderSchema.partial();
//# sourceMappingURL=OrderSchema.js.map