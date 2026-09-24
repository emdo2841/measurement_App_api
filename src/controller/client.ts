import { prisma } from "../db";
import { Request, Response } from "express";
import { createClientSchema, UpdateClientSchema } from "../schemas/client.schema";
import { uploadImageBuffer, deleteImage } from "../Utils/cloudinary";
import { getCache, setCache, delCache } from '../middleWare/cache';

const clientsListCacheKey = (userId: string) =>
    `clients:${userId}:all`

const clientCacheKey = (userId: string, clientId: string) =>
    `client:${userId}:${clientId}`

export const createClient = async (
    req: Request,
    res: Response,
) => {
    try {
        const userId = req.user?.userId

        if (!userId) {
            return res.status(401).json({
                error: 'Unauthorized',
            })
        }

        const file =
            req.file as Express.Multer.File | undefined

        const validatedData =
            createClientSchema.safeParse(req.body)

        if (!validatedData.success) {
            return res.status(400).json({
                error: validatedData.error.format(),
            })
        }

        const {
            measurements,
            ...clientData
        } = validatedData.data

        let imageUrl: string | undefined
        let imagePublicId: string | undefined

        if (file) {
            const uploaded = await uploadImageBuffer(
                file.buffer,
                'clients',
            )

            imageUrl = uploaded.url
            imagePublicId = uploaded.publicId
        }

        const client = await prisma.client.create({
            data: {
                ...clientData,

                ...(imageUrl && imagePublicId
                    ? {
                        image: imageUrl,
                        imagePublicId,
                    }
                    : {}),

                tailor: {
                    connect: {
                        id: userId,
                    },
                },

                ...(measurements?.length
                    ? {
                        measurements: {
                            create: measurements,
                        },
                    }
                    : {}),
            },

            include: {
                measurements: true,

                tailor: {
                    select: {
                        id: true,
                        name: true,
                    },
                },

                orders: {
                    select: {
                        dueDate: true,
                        status: true,
                        totalAmount: true,
                    },
                },
            },
        })

        await delCache(clientsListCacheKey(userId))

        return res.status(201).json({status: "success", data: client})
    } catch (error) {
        req.log.error(
            { err: error },
            'Create client failed',
        )

        return res.status(500).json({
            error: 'Internal server error',
        })
    }
}

export const getClient = async (req: Request, res: Response) => {
    try {
        const clientId = req.params.id;
        const userId = req.user!.userId;
        const cachedKey = clientCacheKey(userId, clientId)

        // 1. Try cache first
        const cached = await getCache(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }

        const client = await prisma.client.findFirst({
            where: { id: clientId, tailorId: userId },
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
        await setCache(cachedKey, client);
        return res.status(200).json({status: "success", data: client})
    } catch (error) {
        req.log.error({ err: error }, "Get client failed");
        return res.status(500).json({ error: "Internal server error" });

    }
}
export const getClients = async (req: Request, res: Response) => {
    try {

        // 1. Try cache first
        const userId = req.user!.userId;
        const cacheKey = clientsListCacheKey(userId);

        const cached = await getCache(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        const clients = await prisma.client.findMany({
            where: { tailorId: userId },
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
        await setCache(cacheKey, clients);
        return res.status(200).json({status: "success", data: clients})
    } catch (error) {
        req.log.error({ err: error }, "Get clients failed");
        return res.status(500).json({ error: "Internal server error" });

    }
}
export const updateClient = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const userId = req.user!.userId;
        const file = req.file as Express.Multer.File | undefined;
        const validatedData = UpdateClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const existingClient = await prisma.client.findFirst({
            where: { id, tailorId: userId },
        });
        if (!existingClient) {
            return res.status(404).json({ error: "Client not found" });
        }

        let imageUrl: string | undefined;
        let imagePublicId: string | undefined;
        const { measurements, ...clientData } = validatedData.data;
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
                ...(measurements && measurements.length > 0
                    ? { measurements: { create: measurements } }
                    : {}),
            },
        });
        await delCache(
            clientsListCacheKey(userId),
            clientCacheKey(userId, id),
            ...(measurements && measurements.length > 0
                ? [`measurements:${userId}:all`, `measurements:${userId}:client:${id}`]
                : [])
        );
        return res.status(200).json({status: "success", data: client})
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "Client not found" });
        }
        req.log.error({ err: error }, "Update client failed");
        return res.status(500).json({ error: "Internal server error" });

    }
};

export const deleteClient = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userId = req.user!.userId;
        const existingClient = await prisma.client.findFirst({
            where: { id, tailorId: userId },
            select: { id: true },
        });
        if (!existingClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        await prisma.client.delete({ where: { id } });
        await delCache(
            clientsListCacheKey(userId),
            clientCacheKey(userId, id),
            `measurements:${userId}:all`,
            `measurements:${userId}:client:${id}`
        );
        return res.status(200).json({ message: "Client deleted successfully" });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "Client not found" });
        }
        req.log.error({ err: error }, "Delete client failed");
        return res.status(500).json({ error: "Internal server error" });
    }

}
