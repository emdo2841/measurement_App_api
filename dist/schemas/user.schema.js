"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.UpdateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
// runtime validation with zod
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1, { message: "name is required" }).max(100, { message: "name must be less than 100 characters" }),
    phone: zod_1.z.string().min(10, { message: "Phone is required" }).max(15, { message: "Phone must be less than 15 characters" }),
    email: zod_1.z.email({ message: "Invalid email address" }).trim().toLowerCase(),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    imagePublicId: zod_1.z.string().optional().nullable()
});
exports.UpdateUserSchema = exports.createUserSchema.partial();
exports.LoginSchema = zod_1.z.object({
    email: zod_1.z.email({ message: "provide a valid Email" }).trim().toLowerCase(),
    password: zod_1.z.string().min(6, { message: "Password must be at least 6 character" }).max(100, { message: "Password must be less than 100 characters" })
});
//# sourceMappingURL=user.schema.js.map