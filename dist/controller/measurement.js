"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeasurement = exports.updateMeasurement = exports.getMeasurementsByClient = exports.getMeasurement = exports.getAllMeasurements = exports.createMeasurement = void 0;
const db_1 = require("../db");
const cache_1 = require("../middleWare/cache");
const measurement_schema_1 = require("../schemas/measurement.schema"); // adjust path to wherever your zod file lives
const measurementCacheKey = (id) => `measurement:${id}`;
const clientMeasurementsCacheKey = (clientId) => `measurements:client:${clientId}`;
const ALL_MEASUREMENTS_CACHE_KEY = 'measurements:all';
const createMeasurement = async (req, res) => {
    try {
        const validatedData = measurement_schema_1.createMeasurementSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const measurement = await db_1.prisma.measurement.create({
            data: validatedData.data,
        });
        // Invalidate the client's measurement list — it now has a new entry
        await (0, cache_1.delCache)(clientMeasurementsCacheKey(measurement.clientId));
        return res.status(201).json(measurement);
    }
    catch (error) {
        if (error?.code === 'P2003') {
            return res.status(400).json({ error: 'Invalid clientId — client does not exist' });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createMeasurement = createMeasurement;
const getAllMeasurements = async (req, res) => {
    try {
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(ALL_MEASUREMENTS_CACHE_KEY);
        if (cached) {
            return res.status(200).json(cached);
        }
        // 2. Cache miss -> query DB
        const measurements = await db_1.prisma.measurement.findMany({
            include: {
                client: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
        // 3. Populate cache (short TTL — this list changes as measurements are created/edited)
        await (0, cache_1.setCache)(ALL_MEASUREMENTS_CACHE_KEY, measurements, 60);
        return res.status(200).json(measurements);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllMeasurements = getAllMeasurements;
const getMeasurement = async (req, res) => {
    try {
        const id = req.params.id;
        const cacheKey = measurementCacheKey(id);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        // 2. Cache miss -> query DB
        const measurement = await db_1.prisma.measurement.findUnique({
            where: { id },
        });
        if (!measurement) {
            return res.status(404).json({ error: 'Measurement not found' });
        }
        // 3. Populate cache
        await (0, cache_1.setCache)(cacheKey, measurement);
        return res.status(200).json(measurement);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getMeasurement = getMeasurement;
const getMeasurementsByClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        const cacheKey = clientMeasurementsCacheKey(clientId);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        // 2. Cache miss -> query DB
        const measurements = await db_1.prisma.measurement.findMany({
            where: { clientId },
            orderBy: { createdAt: 'desc' },
        });
        // 3. Populate cache
        await (0, cache_1.setCache)(cacheKey, measurements);
        return res.status(200).json(measurements);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getMeasurementsByClient = getMeasurementsByClient;
const updateMeasurement = async (req, res) => {
    try {
        const id = req.params.id;
        const validatedData = measurement_schema_1.UpdateMeasurementSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const measurement = await db_1.prisma.measurement.update({
            where: { id },
            data: validatedData.data,
        });
        // Invalidate the single-measurement cache and the client's list
        await (0, cache_1.delCache)(measurementCacheKey(id), clientMeasurementsCacheKey(measurement.clientId));
        return res.status(200).json(measurement);
    }
    catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Measurement not found' });
        }
        if (error?.code === 'P2003') {
            return res.status(400).json({ error: 'Invalid clientId — client does not exist' });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateMeasurement = updateMeasurement;
const deleteMeasurement = async (req, res) => {
    try {
        const id = req.params.id;
        const measurement = await db_1.prisma.measurement.delete({
            where: { id },
        });
        // Invalidate the single-measurement cache and the client's list
        await (0, cache_1.delCache)(measurementCacheKey(id), clientMeasurementsCacheKey(measurement.clientId));
        return res.status(200).json({ message: 'Measurement deleted successfully' });
    }
    catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Measurement not found' });
        }
        console.log(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteMeasurement = deleteMeasurement;
//# sourceMappingURL=measurement.js.map