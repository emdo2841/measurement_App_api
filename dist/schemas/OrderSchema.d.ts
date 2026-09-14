import { z } from 'zod';
export declare const createOrderSchema: z.ZodObject<{
    clientId: z.ZodUUID;
    status: z.ZodDefault<z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CUTTING: "CUTTING";
        readonly SEWING: "SEWING";
        readonly FITTING: "FITTING";
        readonly COMPLETED: "COMPLETED";
        readonly DELIVERED: "DELIVERED";
    }>>;
    dueDate: z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>;
    totalAmount: z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>;
    notes: z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>;
    image: z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>;
}, z.core.$strip>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export declare const updateOrderSchema: z.ZodObject<{
    clientId: z.ZodOptional<z.ZodUUID>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        readonly PENDING: "PENDING";
        readonly CUTTING: "CUTTING";
        readonly SEWING: "SEWING";
        readonly FITTING: "FITTING";
        readonly COMPLETED: "COMPLETED";
        readonly DELIVERED: "DELIVERED";
    }>>>;
    dueDate: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodCoercedDate<unknown>>>>;
    totalAmount: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodCoercedNumber<unknown>>>>;
    notes: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>>;
    image: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodNullable<z.ZodString>>, z.ZodLiteral<"">]>>;
}, z.core.$strip>;
export type UpdateOrderInput = z.infer<typeof updateOrderSchema>;
//# sourceMappingURL=OrderSchema.d.ts.map