"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMeasurementSchema = exports.createMeasurementSchema = void 0;
const zod_1 = require("zod");
exports.createMeasurementSchema = zod_1.z.object({
    title: zod_1.z.string({ error: "Title is required" })
        .trim()
        .min(2, "Title must be at least 2 characters"),
    // e.g. { chest: 40, waist: 32, hips: 38 }
    data: zod_1.z.record(zod_1.z.string(), zod_1.z.number(), { error: "Data is required" })
        .refine((obj) => Object.keys(obj).length > 0, {
        message: "At least one measurement value is required",
    }),
    // Validates that unit is either "CM" or "INCHES"
    unit: zod_1.z.enum(["CM", "INCHES"], {
        error: "Unit must be either CM or INCHES",
    }).default("INCHES"),
    clientId: zod_1.z.uuid({ error: "Invalid Client ID" }),
});
exports.UpdateMeasurementSchema = exports.createMeasurementSchema.partial();
//# sourceMappingURL=measurement.schema.js.map