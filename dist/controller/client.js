"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClient = exports.updateClient = exports.getClients = exports.getClient = exports.createClient = void 0;
const db_1 = require("../db");
const client_schema_1 = require("../schemas/client.schema");
const cloudinary_1 = require("../Utils/cloudinary");
const cache_1 = require("../middleWare/cache");
const CLIENT_LIST_CACHE_KEY = 'clients:all';
const clientCatchedKey = (id) => `client:${id}`;
const createClient = async (req, res) => {
    try {
        const file = req.file;
        const validatedData = client_schema_1.createClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const { tailorId, measurements, ...clientData } = validatedData.data;
        let imageUrl;
        let imagePublicId;
        if (file) {
            const { url, publicId } = await (0, cloudinary_1.uploadImageBuffer)(file.buffer, 'clients');
            imageUrl = url;
            imagePublicId = publicId;
        }
        const client = await db_1.prisma.client.create({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.createClient = createClient;
const getClient = async (req, res) => {
    try {
        const clientId = req.params.id;
        const cachedKey = clientCatchedKey(clientId);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        const client = await db_1.prisma.client.findUnique({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getClient = getClient;
const getClients = async (req, res) => {
    try {
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(CLIENT_LIST_CACHE_KEY);
        if (cached) {
            return res.status(200).json(cached);
        }
        const clients = await db_1.prisma.client.findMany({
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getClients = getClients;
const updateClient = async (req, res) => {
    const id = req.params.id;
    try {
        const file = req.file;
        const validatedData = client_schema_1.UpdateClientSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const existingClient = await db_1.prisma.client.findUnique({ where: { id } });
        if (!existingClient) {
            return res.status(404).json({ error: "Client not found" });
        }
        let imageUrl;
        let imagePublicId;
        const { tailorId, measurements, ...clientData } = validatedData.data;
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
                ...(tailorId ? { tailor: { connect: { id: tailorId } } } : {}),
                ...(measurements && measurements.length > 0
                    ? { measurements: { create: measurements } }
                    : {}),
            },
        });
        await (0, cache_1.delCache)('clients:all');
        return res.status(200).json(client);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateClient = updateClient;
const deleteClient = async (req, res) => {
    try {
        const id = req.params.id;
        const client = await db_1.prisma.client.delete({
            where: { id }
        });
        await (0, cache_1.delCache)('clients:all');
        return res.status(200).json({ message: "Client deleted successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteClient = deleteClient;
//# sourceMappingURL=client.js.map