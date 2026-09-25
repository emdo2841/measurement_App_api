import { z } from 'zod'

const inlineMeasurementSchema = z.object({
  title: z.string().trim().min(1),
  unit: z.enum(['CM', 'INCHES']).default('INCHES'),
  data: z.record(z.string(), z.number()),
})

export const createClientSchema = z.object({
  name: z.string().trim().min(1).max(100),

  phone: z.string()
    .trim()
    .min(10)
    .max(15),

  email: z.email()
    .trim()
    .toLowerCase()
    .optional()
    .nullable(),

  image: z.string().optional().nullable().or(z.literal("")),

  address: z.string()
    .trim()
    .optional()
    .nullable()
    .or(z.literal('')),

  gender: z.enum(['MALE', 'FEMALE']),

  measurements: z.array(inlineMeasurementSchema).optional(),
})

export const UpdateClientSchema = createClientSchema.partial()

export type CreateClientInput = z.infer<typeof createClientSchema>;

export type UpdateClientInput =
  z.infer<typeof UpdateClientSchema>