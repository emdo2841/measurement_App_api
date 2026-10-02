"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientsPaginated = getClientsPaginated;
exports.getOrdersPaginated = getOrdersPaginated;
exports.getMeasurementsPaginated = getMeasurementsPaginated;
const db_1 = require("../db");
const cache_1 = require("../middleWare/cache");
const paginatedCache_1 = require("../middleWare/paginatedCache");
const pagination_1 = require("../Utils/pagination");
const CACHE_TTL_SECONDS = 60;
function authenticatedUserId(req) {
    const userId = req.user?.userId;
    if (!userId)
        throw new Error('UNAUTHORIZED');
    return userId;
}
async function getClientsPaginated(req, res) {
    try {
        const userId = authenticatedUserId(req);
        const { page, limit, skip } = (0, pagination_1.getPagination)(req.query);
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
        const cacheKey = await (0, paginatedCache_1.paginatedListCacheKey)('clients', userId, { page, limit, search });
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached)
            return res.status(200).json(cached);
        const where = {
            tailorId: userId,
            ...(search ? { OR: [
                    { name: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search } },
                    { email: { contains: search, mode: 'insensitive' } },
                    { address: { contains: search, mode: 'insensitive' } },
                ] } : {}),
        };
        const [data, total] = await db_1.prisma.$transaction([
            db_1.prisma.client.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { measurements: { orderBy: { updatedAt: 'desc' } }, orders: { select: { id: true, dueDate: true, status: true, totalAmount: true } } } }),
            db_1.prisma.client.count({ where }),
        ]);
        const payload = { status: 'successful', data, pagination: (0, pagination_1.paginationMeta)(page, limit, total) };
        await (0, cache_1.setCache)(cacheKey, payload, CACHE_TTL_SECONDS);
        return res.status(200).json(payload);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'UNAUTHORIZED')
            return res.status(401).json({ error: 'Unauthorized access' });
        req.log.error({ err: error }, 'Get clients failed');
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getOrdersPaginated(req, res) {
    try {
        const userId = authenticatedUserId(req);
        const { page, limit, skip } = (0, pagination_1.getPagination)(req.query);
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
        const status = typeof req.query.status === 'string' && req.query.status !== 'ALL' ? req.query.status : undefined;
        const cacheKey = await (0, paginatedCache_1.paginatedListCacheKey)('orders', userId, { page, limit, search, status });
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached)
            return res.status(200).json(cached);
        const where = {
            client: { tailorId: userId },
            ...(status ? { status: status } : {}),
            ...(search ? { OR: [
                    { client: { name: { contains: search, mode: 'insensitive' } } },
                    { notes: { contains: search, mode: 'insensitive' } },
                ] } : {}),
        };
        const [data, total] = await db_1.prisma.$transaction([
            db_1.prisma.order.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { client: { select: { id: true, name: true, image: true } } } }),
            db_1.prisma.order.count({ where }),
        ]);
        const payload = { status: 'successful', data, pagination: (0, pagination_1.paginationMeta)(page, limit, total) };
        await (0, cache_1.setCache)(cacheKey, payload, CACHE_TTL_SECONDS);
        return res.status(200).json(payload);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'UNAUTHORIZED')
            return res.status(401).json({ error: 'Unauthorized access' });
        req.log.error({ err: error }, 'Get orders failed');
        return res.status(500).json({ error: 'Internal server error' });
    }
}
async function getMeasurementsPaginated(req, res) {
    try {
        const userId = authenticatedUserId(req);
        const { page, limit, skip } = (0, pagination_1.getPagination)(req.query);
        const search = typeof req.query.search === 'string' ? req.query.search.trim() : '';
        const cacheKey = await (0, paginatedCache_1.paginatedListCacheKey)('measurements', userId, { page, limit, search });
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached)
            return res.status(200).json(cached);
        const where = {
            client: { tailorId: userId },
            ...(search ? { OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { client: { name: { contains: search, mode: 'insensitive' } } },
                ] } : {}),
        };
        const [data, total] = await db_1.prisma.$transaction([
            db_1.prisma.measurement.findMany({ where, skip, take: limit, orderBy: { updatedAt: 'desc' }, include: { client: { select: { id: true, name: true, image: true } } } }),
            db_1.prisma.measurement.count({ where }),
        ]);
        const payload = { status: 'successful', data, pagination: (0, pagination_1.paginationMeta)(page, limit, total) };
        await (0, cache_1.setCache)(cacheKey, payload, CACHE_TTL_SECONDS);
        return res.status(200).json(payload);
    }
    catch (error) {
        if (error instanceof Error && error.message === 'UNAUTHORIZED')
            return res.status(401).json({ error: 'Unauthorized access' });
        req.log.error({ err: error }, 'Get measurements failed');
        return res.status(500).json({ error: 'Internal server error' });
    }
}
//# sourceMappingURL=paginatedList.js.map