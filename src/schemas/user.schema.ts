import { z } from "zod";

// runtime validation with zod

export const createUserSchema = z.object({
    name: z.string().trim().min(1, { message: "name is required" }).max(100, { message: "name must be less than 100 characters" }),
    phone: z.string().min(10, { message: "Phone is required" }).max(15, { message: "Phone must be less than 15 characters" }),
    email: z.email({ message: "Invalid email address" }).trim().toLowerCase(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100, { message: "Password must be less than 100 characters" }),
    image: z.string().optional().nullable(),
    imagePublicId: z.string().optional().nullable()
    
})
export const UpdateUserSchema = createUserSchema.partial();

export const LoginSchema = z.object({
    email: z.email({message: "provide a valid Email"}).trim().toLowerCase(),
    password: z.string().min(6, {message: "Password must be at least 6 character"}).max(100, {message: "Password must be less than 100 characters"})
})

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type loginSchemaInput = z.infer<typeof LoginSchema>
