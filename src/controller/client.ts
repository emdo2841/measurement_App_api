import { prisma } from "../db";
import { Request, Response } from "express";
import { createClientSchema, UpdateClientSchema } from "../schemas/client.schema";
import { uploadImageBuffer, deleteImage } from "../Utils/cloudinary";
import multer from "multer";
import { getCache, setCache, delCache } from '../middleWare/cache';

const CLIENT_LIST_CACHE_KEY = 'clients:all';
const clientCatchedKey = (id: string) => `client:${id}`;

export const createClient = async (req: Request, res: Response) => {
    try {
        const file = req.file as Express.Multer.File | undefined;
        const validatedData = createClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }

        const { tailorId, measurements, ...clientData } = validatedData.data;
        let imageUrl: string | undefined;
        let imagePublicId: string | undefined;
        if (file) {
            const { url, publicId } = await uploadImageBuffer(file.buffer, 'clients');
            imageUrl = url;
            imagePublicId = publicId;
        }
        const client = await prisma.client.create({
            data: {
                ...clientData,
                ...(imageUrl ? { image: imageUrl, imagePublicId } : {}),
                tailor: { connect: { id: tailorId } },
                ...(measurements && measurements.length > 0
                    ? { measurements: { create: measurements } }
                    : {}),
            },
            include: {
                measurements: true,
                tailor: {
                    select: {
                        id: true,
                        name: true,
                    }
                }, // Include the tailor relation in the response
                orders: {
                    select: {
                        dueDate: true,
                        status: true,
                        totalAmount: true,
                    }
                }
            },

        });

        return res.status(201).json(client);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const getClient = async (req: Request, res: Response) => {
    try {
        const clientId = req.params.id;
        const cachedKey = clientCatchedKey(clientId)

        // 1. Try cache first
        const cached = await getCache(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }

        const client = await prisma.client.findUnique({
            where: { id: clientId },
            include: {
                measurements: true,
                tailor: {
                    select: {
                        id: true,
                        name: true,
                    }
                }, // Include the tailor relation in the response
                orders: {
                    select: {
                        dueDate: true,
                        status: true,
                        totalAmount: true,
                    }
                } // Include the orders relation in the response
            }
        });
        if (!client) {
            return res.status(404).json({ error: "Client not found" });
        }
        return res.status(200).json(client);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });

    }
}
export const getClients = async (req: Request, res: Response) => {
    try {

        // 1. Try cache first
        const cached = await getCache(CLIENT_LIST_CACHE_KEY);
        if (cached) {
            return res.status(200).json(cached);
        }
        const clients = await prisma.client.findMany({
            include: {
                measurements: true,
                tailor: {
                    select: {
                        id: true,
                        name: true,
                    }
                }, // Include the tailor relation in the response
                orders: {
                    select: {
                        dueDate: true,
                        status: true,
                        totalAmount: true,
                    }
                } // Include the orders relation in the response
            }
        });
        return res.status(200).json(clients);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });

    }
}
export const updateClient = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const file = req.file as Express.Multer.File | undefined;
        const validatedData = UpdateClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const existingClient = await prisma.client.findUnique({ where: { id } });
        if (!existingClient) {
            return res.status(404).json({ error: "Client not found" });
        }

        let imageUrl: string | undefined;
        let imagePublicId: string | undefined;
        const { tailorId, measurements, ...clientData } = validatedData.data;
        let imageUpdate = {};
        if (file) {
            // Upload the new image first
            const uploaded = await uploadImageBuffer(file.buffer, 'clients');

            // Then delete the old one, if it exists
            if (existingClient.imagePublicId) {
                await deleteImage(existingClient.imagePublicId);
            }

            imageUpdate = { image: uploaded.url, imagePublicId: uploaded.publicId };

        }
        const client = await prisma.client.update({
            where: { id },
            data: {
                ...clientData,
                ...imageUpdate,
                ...(tailorId ? { tailor: { connect: { id: tailorId } } } : {}),
                ...(measurements && measurements.length > 0
                    ? { measurements: { create: measurements } }
                    : {}),
            },
        });
        await delCache('clients:all')
        return res.status(200).json(client);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const client = await prisma.client.delete({
            where: { id }
        })
        await delCache('clients:all')
        return res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
}