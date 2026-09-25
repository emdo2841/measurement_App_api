"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
const inlineMeasurementSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(1),
    unit: zod_1.z.enum(['CM', 'INCHES']).default('INCHES'),
    data: zod_1.z.record(zod_1.z.string(), zod_1.z.number()),
});
exports.createClientSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(100),
    phone: zod_1.z.string()
        .trim()
        .min(10)
        .max(15),
    email: zod_1.z.email()
        .trim()
        .toLowerCase()
        .optional()
        .nullable(),
    image: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    address: zod_1.z.string()
        .trim()
        .optional()
        .nullable()
        .or(zod_1.z.literal('')),
    gender: zod_1.z.enum(['MALE', 'FEMALE']),
    measurements: zod_1.z.array(inlineMeasurementSchema).optional(),
});
exports.UpdateClientSchema = exports.createClientSchema.partial();
//# sourceMappingURL=client.schema.js.map