import { OrderStatus } from '@prisma/client';
import { z } from 'zod';

// 1. Create Order Schema (for POST requests)
export const createOrderSchema = z.object({
  clientId: z
    .uuid({ error: "Invalid Client ID format" }),

  status: z
    .enum(OrderStatus, {
      error: () => ({ message: "Invalid status value" }),
    })
    .default(OrderStatus.PENDING),

  // Parses string ISO dates (e.g., "2026-08-15") from JSON/forms into JS Date
  dueDate: z
    .coerce
    .date({ error: "Invalid date format" })
    .nullable()
    .optional(),

  // Coerces string numbers (e.g., "15000.50") into a Float number
  totalAmount: z
    .coerce
    .number({ error: "Total amount must be a valid number" })
    .nonnegative("Total amount cannot be negative")
    .nullable()
    .optional(),

  notes: z
    .string()
    .trim()
    .nullable()
    .optional()
    .or(z.literal('')),

  image: z
    .string()
    .url()
    .nullable()
    .optional()
    .or(z.literal('')),
});

// Infer Type for Order Creation Payload
export type CreateOrderInput = z.infer<typeof createOrderSchema>;


// 2. Update Order Schema (for PATCH/PUT requests)
// Makes all fields optional so you can update just the status or due date alone
export const updateOrderSchema = createOrderSchema.partial();

export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;