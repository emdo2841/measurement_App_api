import { z } from "zod";


export const createClientSchema = z.object({
    name: z.string().trim().min(1).max(100),
    phone: z.string().min(10).max(15),
    email: z.email().optional().nullable(),
    image: z.string().optional().nullable().or(z.literal("")),
    imagePublicId: z.string().optional().nullable().or(z.literal("")),
    address: z.string().optional().nullable().or(z.literal("")),
    gender: z.enum(["MALE", "FEMALE"]),
    tailorId: z.uuid().min(1, { message: "Tailor ID is required" }),
    // Only include if you actually want to create measurements inline:
    measurements: z.array(z.object({
        title: z.string().min(1),
        unit: z.enum(["CM", "INCHES"]).optional(),
        data: z.record(z.string(), z.any()), // matches Json field
    })).optional(),
});

export const UpdateClientSchema = createClientSchema.partial();

export type UpdateClientInput = z.infer<typeof UpdateClientSchema>;
export type CreateClientInput = z.infer<typeof createClientSchema>;