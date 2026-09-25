import { z } from 'zod';
export declare const createClientSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodString;
    email: z.ZodNullable<z.ZodOptional<z.ZodEmail>>;
    image: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    address: z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>;
    gender: z.ZodEnum<{
        MALE: "MALE";
        FEMALE: "FEMALE";
    }>;
    measurements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        unit: z.ZodDefault<z.ZodEnum<{
            CM: "CM";
            INCHES: "INCHES";
        }>>;
        data: z.ZodRecord<z.ZodString, z.ZodNumber>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const UpdateClientSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodEmail>>>;
    image: z.ZodOptional<z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>>;
    address: z.ZodOptional<z.ZodUnion<[z.ZodNullable<z.ZodOptional<z.ZodString>>, z.ZodLiteral<"">]>>;
    gender: z.ZodOptional<z.ZodEnum<{
        MALE: "MALE";
        FEMALE: "FEMALE";
    }>>;
    measurements: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        unit: z.ZodDefault<z.ZodEnum<{
            CM: "CM";
            INCHES: "INCHES";
        }>>;
        data: z.ZodRecord<z.ZodString, z.ZodNumber>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export type CreateClientInput = z.infer<typeof createClientSchema>;
export type UpdateClientInput = z.infer<typeof UpdateClientSchema>;
//# sourceMappingURL=client.schema.d.ts.map