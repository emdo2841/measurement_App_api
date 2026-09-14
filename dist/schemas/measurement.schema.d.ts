import { z } from 'zod';
export declare const createMeasurementSchema: z.ZodObject<{
    title: z.ZodString;
    data: z.ZodRecord<z.ZodString, z.ZodNumber>;
    unit: z.ZodDefault<z.ZodEnum<{
        CM: "CM";
        INCHES: "INCHES";
    }>>;
    clientId: z.ZodUUID;
}, z.core.$strip>;
export declare const UpdateMeasurementSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    data: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    unit: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        CM: "CM";
        INCHES: "INCHES";
    }>>>;
    clientId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
export type UpdateMeasurementInput = z.infer<typeof UpdateMeasurementSchema>;
export type CreateMeasurementInput = z.infer<typeof createMeasurementSchema>;
//# sourceMappingURL=measurement.schema.d.ts.map