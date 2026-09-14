"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientSchema = exports.createClientSchema = void 0;
const zod_1 = require("zod");
exports.createClientSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(100),
    phone: zod_1.z.string().min(10).max(15),
    email: zod_1.z.email().optional().nullable(),
    image: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    imagePublicId: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    address: zod_1.z.string().optional().nullable().or(zod_1.z.literal("")),
    gender: zod_1.z.enum(["MALE", "FEMALE"]),
    tailorId: zod_1.z.uuid().min(1, { message: "Tailor ID is required" }),
    // Only include if you actually want to create measurements inline:
    measurements: zod_1.z.array(zod_1.z.object({
        title: zod_1.z.string().min(1),
        unit: zod_1.z.enum(["CM", "INCHES"]).optional(),
        data: zod_1.z.record(zod_1.z.string(), zod_1.z.any()), // matches Json field
    })).optional(),
});
exports.UpdateClientSchema = exports.createClientSchema.partial();
//# sourceMappingURL=client.schema.js.map