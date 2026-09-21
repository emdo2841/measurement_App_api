"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrder = exports.getOrder = exports.getOrders = exports.createOrder = void 0;
const db_1 = require("../db");
const OrderSchema_1 = require("../schemas/OrderSchema");
const cache_1 = require("../middleWare/cache");
const orderCacheKey = (id) => `order:${id}`;
const ORDERS_LIST_CACHE_KEY = 'orders:all';
const createOrder = async (req, res) => {
    try {
        const validatedData = OrderSchema_1.createOrderSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const { clientId, ...orderData } = validatedData.data;
        const client = await db_1.prisma.client.findFirst({ where: { id: clientId, tailorId: req.user.userId } });
        if (!client) {
            return res.status(404).json({ error: "Client not found or not owned by user" });
        }
        const order = await db_1.prisma.order.create({
            data: {
                ...orderData,
                client: { connect: { id: clientId } },
            },
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        await (0, cache_1.delCache)(ORDERS_LIST_CACHE_KEY);
        return res.status(201).json(order);
    }
    catch (error) {
        console.log({ "error": error });
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.createOrder = createOrder;
const getOrders = async (req, res) => {
    try {
        const order = await db_1.prisma.order.findMany({
            where: { client: { tailorId: req.user.userId } },
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        return res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "internal server error" });
    }
};
exports.getOrders = getOrders;
const getOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const cachedKey = orderCacheKey(id);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        const order = await db_1.prisma.order.findFirst({
            where: { id, client: { tailorId: req.user.userId } },
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        });
        return res.status(200).json(order);
        if (!order)
            return res.status(404).json({ error: 'Order not found' });
        return res.status(200).json(order);
    }
    catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getOrder = getOrder;
const updateOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const validatedData = OrderSchema_1.updateOrderSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const { clientId, ...orderData } = validatedData.data;
        if (clientId) {
            const client = await db_1.prisma.client.findFirst({ where: { id: clientId, tailorId: req.user.userId } });
            if (!client)
                return res.status(404).json({ error: 'Client not found' });
        }
        const order = await db_1.prisma.order.update({
            where: { id, client: { tailorId: req.user.userId } },
            data: {
                ...orderData,
                ...(clientId ? { client: { connect: { id: clientId } } } : {})
            },
        });
        // Invalidate stale cache entries for this user
        await (0, cache_1.delCache)(ORDERS_LIST_CACHE_KEY, orderCacheKey(id));
        return res.status(200).json(order);
    }
    catch (error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ error: 'Order not found' });
        }
        console.log(error);
        return res.status(500).json({ error: "internal server error" });
    }
};
exports.updateOrder = updateOrder;
const deleteOrder = async (req, res) => {
    try {
        const id = req.params.id;
        const order = await db_1.prisma.order.delete({
            where: { id, client: { tailorId: req.user.userId } }
        });
        // Invalidate stale cache entries for this user
        await (0, cache_1.delCache)(ORDERS_LIST_CACHE_KEY, orderCacheKey(id));
        return res.status(200).json({ message: "order deleted successfully" });
    }
    catch (error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({ error: 'Order not found' });
        }
        console.log(error);
        return res.status(500).json({ error: "internal server error" });
    }
};
exports.deleteOrder = deleteOrder;
//# sourceMappingURL=order.js.map