import { z } from 'zod';

export const createMeasurementSchema = z.object({
  title: z.string({ error: "Title is required" })
    .trim()
    .min(2, "Title must be at least 2 characters"),

  // e.g. { chest: 40, waist: 32, hips: 38 }
  data: z.record(z.string(), z.number(), { error: "Data is required" })
    .refine((obj) => Object.keys(obj).length > 0, {
      message: "At least one measurement value is required",
    }),

  // Validates that unit is either "CM" or "INCHES"
  unit: z.enum(["CM", "INCHES"], {
    error: "Unit must be either CM or INCHES",
  }).default("INCHES"),

  clientId: z.uuid({ error: "Invalid Client ID" }),
});
export const UpdateMeasurementSchema = createMeasurementSchema.partial();

export type UpdateMeasurementInput = z.infer<typeof UpdateMeasurementSchema>;

export type CreateMeasurementInput = z.infer<typeof createMeasurementSchema>;