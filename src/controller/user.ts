import { prisma } from "../db";
import { Request, Response } from "express";
import { createUserSchema, UpdateUserSchema } from "../schemas/user.schema";
import bcrypt from "bcryptjs";
import 'dotenv/config';
import { uploadImageBuffer, deleteImage } from "../Utils/cloudinary";
import { sendEmail } from "../services/email";
import { signupTemplate } from "../template/emailTemplate";

export const createUser = async (req: Request, res: Response) => {
    try {
        const file = req.file as Express.Multer.File | undefined;
        const validatedData = createUserSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const { email, name, password, phone } = validatedData.data;

        let imageUrl: string | undefined;
        let imagePublicId: string | undefined;
        if (file) {
            const { url, publicId } = await uploadImageBuffer(file.buffer, 'users');
            imageUrl = url;
            imagePublicId = publicId;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                image: imageUrl,
                imagePublicId,
                password: hashedPassword,
                phone
            }
        });
        const htmlContent = signupTemplate(user.name);
        try {
            await sendEmail({
                to: email,
                subject: "Welcome to EJ Services. ",
                html: htmlContent
            })
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
        }
        return res.status(201).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });

    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const validatData = UpdateUserSchema.safeParse(req.body);
        if (!validatData.success) {
            return res.status(400).json({ error: validatData.error.format() });
        }
        const user = await prisma.user.update({
            where: { id },
            data: validatData.data
        })
        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        // 1. Query the user along with nested client and order imagePublicIds
        const user = await prisma.user.findUnique({
            where: { id },
            select: {
                imagePublicId: true,
                clients: {
                    select: {
                        imagePublicId: true,
                        orders: {
                            select: {
                                imagePublicId: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // 2. Collect all non-null publicIds into a single array
        const publicIds: string[] = [];

        if (user.imagePublicId) publicIds.push(user.imagePublicId);

        for (const client of user.clients) {
            if (client.imagePublicId) publicIds.push(client.imagePublicId);
            for (const order of client.orders) {
                if (order.imagePublicId) publicIds.push(order.imagePublicId);
            }
        }

        // 3. Delete all collected images in parallel
        if (publicIds.length > 0) {
            await Promise.allSettled(
                publicIds.map((publicId) => deleteImage(publicId))
            );
        }

        // 4. Delete user from database
        await prisma.user.delete({
            where: { id },
        });

        return res.status(200).json({ message: "User and associated images deleted successfully" });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "User not found" });
        }

        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const profile = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ message: "unathorized access" })
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: true,
                createdAt: true
            }
        })
        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}