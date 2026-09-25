"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClients = exports.getClient = exports.createClient = void 0;
const db_1 = require("../db");
const client_schema_1 = require("../schemas/client.schema");
const cloudinary_1 = require("../Utils/cloudinary");
const cache_1 = require("../middleWare/cache");
const clientsListCacheKey = (userId) => `clients:${userId}:all`;
const clientCacheKey = (userId, clientId) => `client:${userId}:${clientId}`;
const createClient = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                error: 'Unauthorized',
            });
        }
        const file = req.file;
        const validatedData = client_schema_1.createClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({
                error: validatedData.error.format(),
            });
        }
        const { measurements, ...clientData } = validatedData.data;
        let imageUrl;
        let imagePublicId;
        if (file) {
            const uploaded = await (0, cloudinary_1.uploadImageBuffer)(file.buffer, 'clients');
            imageUrl = uploaded.url;
            imagePublicId = uploaded.publicId;
        }
        const client = await db_1.prisma.client.create({
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
        });
        await (0, cache_1.delCache)(clientsListCacheKey(userId));
        return res.status(201).json({ status: "success", data: client });
    }
    catch (error) {
        req.log.error({ err: error }, 'Create client failed');
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};
exports.createClient = createClient;
const getClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const userId = req.user.userId;
        const cachedKey = clientCacheKey(userId, clientId);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        const client = await db_1.prisma.client.findFirst({
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
        await (0, cache_1.setCache)(cachedKey, client);
        return res.status(200).json({ status: "success", data: client });
    }
    catch (error) {
        req.log.error({ err: error }, "Get client failed");
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getClient = getClient;
const getClients = async (req, res) => {
    try {
        // 1. Try cache first
        const userId = req.user.userId;
        const cacheKey = clientsListCacheKey(userId);
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        const clients = await db_1.prisma.client.findMany({
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
        await (0, cache_1.setCache)(cacheKey, clients);
        return res.status(200).json({ status: "success", data: clients });
    }
    catch (error) {
        req.log.error({ err: error }, "Get clients failed");
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getClients = getClients;
const updateClient = async (req, res) => {
    const id = req.params.id;
    try {
        const userId = req.user.userId;
        const file = req.file;
        const validatedData = client_schema_1.UpdateClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const existingClient = await db_1.prisma.client.findFirst({
            where: { id, tailorId: userId },
        });
        if (!existingClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        let imageUrl;
        let imagePublicId;
        const { measurements, ...clientData } = validatedData.data;
        let imageUpdate = {};
        if (file) {
            // Upload the new image first
            const uploaded = await (0, cloudinary_1.uploadImageBuffer)(file.buffer, 'clients');
            // Then delete the old one, if it exists
            if (existingClient.imagePublicId) {
                await (0, cloudinary_1.deleteImage)(existingClient.imagePublicId);
            }
            imageUpdate = { image: uploaded.url, imagePublicId: uploaded.publicId };
        }
        const client = await db_1.prisma.client.update({
            where: { id },
            data: {
                ...clientData,
                ...imageUpdate,
                ...(measurements && measurements.length > 0
                    ? { measurements: { create: measurements } }
                    : {}),
            },
        });
        await (0, cache_1.delCache)(clientsListCacheKey(userId), clientCacheKey(userId, id), ...(measurements && measurements.length > 0
            ? [`measurements:${userId}:all`, `measurements:${userId}:client:${id}`]
            : []));
        return res.status(200).json({ status: "success", data: client });
    }
    catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "Client not found" });
        }
        req.log.error({ err: error }, "Update client failed");
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.userId;
        const existingClient = await db_1.prisma.client.findFirst({
            where: { id, tailorId: userId },
            select: { id: true },
        });
        if (!existingClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        await db_1.prisma.client.delete({ where: { id } });
        await (0, cache_1.delCache)(clientsListCacheKey(userId), clientCacheKey(userId, id), `measurements:${userId}:all`, `measurements:${userId}:client:${id}`);
        return res.status(200).json({ message: "Client deleted successfully" });
    }
    catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "Client not found" });
        }
        req.log.error({ err: error }, "Delete client failed");
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteClient = deleteClient;
//# sourceMappingURL=client.js.map