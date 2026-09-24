import type { Request, Response } from 'express';
import { prisma } from '../db';
import { getCache, setCache, delCache } from '../middleWare/cache';
import {
  createMeasurementSchema,
  UpdateMeasurementSchema,
} from '../schemas/measurement.schema'; // adjust path to wherever your zod file lives

const measurementCacheKey = (userId: string, id: string) => `measurement:${userId}:${id}`;
const clientMeasurementsCacheKey = (userId: string, clientId: string) =>
  `measurements:${userId}:client:${clientId}`;
const allMeasurementsCacheKey = (userId: string) => `measurements:${userId}:all`;

export const createMeasurement = async (req: Request, res: Response) => {
  try {
    const validatedData = createMeasurementSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ error: validatedData.error.format() });
    }
    const userId = req.user!.userId;
    const client = await prisma.client.findFirst({
      where: { id: validatedData.data.clientId, tailorId: userId },
      select: { id: true },
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }

    const measurement = await prisma.measurement.create({
      data: validatedData.data,
    });

    await delCache(
     clientMeasurementsCacheKey(userId, measurement.clientId),
      allMeasurementsCacheKey(userId)
    );

    return res.status(201).json({status: "successful", data: measurement});
  } catch (error: any) {
    if (error?.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid clientId — client does not exist' });
    }
    req.log.error({ err: error }, 'Create measurement failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllMeasurements = async (req: Request, res: Response) => {
  try {
    // 1. Try cache first
    const userId = req.user!.userId;

    const cacheKey = allMeasurementsCacheKey(userId);
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }
 
    // 2. Cache miss -> query DB
    const measurements = await prisma.measurement.findMany({
      where: { client: { tailorId: userId } },
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
    await setCache(cacheKey, measurements, 60);
 
    return res.status(200).json({status: "successful", data: measurements});
  } catch (error) {
    req.log.error({ err: error }, 'Get measurements failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = req.user!.userId;
    const cacheKey = measurementCacheKey(userId, id);
    // 1. Try cache first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json({ status: "successful", data: cached });
    }

    // 2. Cache miss -> query DB
    const measurement = await prisma.measurement.findFirst({
      where: { id, client: { tailorId: userId } },
     });
    if (!measurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }

    // 3. Populate cache
    await setCache(cacheKey, measurement);

    return res.status(200).json({status: "successful", data: measurement});
  } catch (error) {
    req.log.error({ err: error }, 'Get measurement failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMeasurementsByClient = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.clientId;
    const userId = req.user!.userId;
    const cacheKey = clientMeasurementsCacheKey(userId, clientId);

    const client = await prisma.client.findFirst({
      where: { id: clientId, tailorId: userId },
      select: { id: true },
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    // 2. Cache miss -> query DB
    const measurements = await prisma.measurement.findMany({
      where: { clientId, client: { tailorId: userId } },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Populate cache
    await setCache(cacheKey, measurements);

    return res.status(200).json({status: "successful", data: measurements});
  } catch (error) {
    req.log.error({ err: error }, 'Get client measurement failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const userId = req.user!.userId;

    const validatedData = UpdateMeasurementSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ error: validatedData.error.format() });
    }
    const existingMeasurement = await prisma.measurement.findFirst({
      where: { id, client: { tailorId: userId } },
      select: { id: true, clientId: true },
    });
    if (!existingMeasurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }

    if (validatedData.data.clientId) {
      const targetClient = await prisma.client.findFirst({
        where: { id: validatedData.data.clientId, tailorId: userId },
        select: { id: true },
      });
      if (!targetClient) {
        return res.status(404).json({ error: 'Client not found' });
      }
    }


    const measurement = await prisma.measurement.update({
      where: { id },
      data: validatedData.data,
    });

    // Invalidate the single-measurement cache and the client's list
    await delCache(
      measurementCacheKey(userId, id),
      clientMeasurementsCacheKey(userId, existingMeasurement.clientId),
      clientMeasurementsCacheKey(userId, measurement.clientId),
      allMeasurementsCacheKey(userId)
    );

    return res.status(200).json({status: "successful", data: measurement});
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    if (error?.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid clientId — client does not exist' });
    }
    req.log.error({ err: error }, 'Update measurement failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userId = req.user!.userId;

    const existingMeasurement = await prisma.measurement.findFirst({
      where: { id, client: { tailorId: userId } },
      select: { id: true, clientId: true },
    });
    if (!existingMeasurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    // Invalidate the single-measurement cache and the client's list
    await delCache(
      measurementCacheKey(userId, id),
      clientMeasurementsCacheKey(userId, existingMeasurement.clientId),
      allMeasurementsCacheKey(userId)
    );

    return res.status(200).json({ message: 'Measurement deleted successfully' });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    req.log.error({ err: error }, 'Delete measurement failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};