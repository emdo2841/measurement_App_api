import type { Request, Response } from 'express';
import { prisma } from '../db';
import { getCache, setCache, delCache } from '../middleWare/cache';
import {
  createMeasurementSchema,
  UpdateMeasurementSchema,
} from '../schemas/measurement.schema'; // adjust path to wherever your zod file lives

const measurementCacheKey = (id: string) => `measurement:${id}`;
const clientMeasurementsCacheKey = (clientId: string) => `measurements:client:${clientId}`;
const ALL_MEASUREMENTS_CACHE_KEY = 'measurements:all';

export const createMeasurement = async (req: Request, res: Response) => {
  try {
    const validatedData = createMeasurementSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ error: validatedData.error.format() });
    }

    const measurement = await prisma.measurement.create({
      data: validatedData.data,
    });

    // Invalidate the client's measurement list — it now has a new entry
    await delCache(clientMeasurementsCacheKey(measurement.clientId));

    return res.status(201).json(measurement);
  } catch (error: any) {
    if (error?.code === 'P2003') {
      return res.status(400).json({ error: 'Invalid clientId — client does not exist' });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllMeasurements = async (req: Request, res: Response) => {
  try {
    // 1. Try cache first
    const cached = await getCache(ALL_MEASUREMENTS_CACHE_KEY);
    if (cached) {
      return res.status(200).json(cached);
    }
 
    // 2. Cache miss -> query DB
    const measurements = await prisma.measurement.findMany({
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
    await setCache(ALL_MEASUREMENTS_CACHE_KEY, measurements, 60);
 
    return res.status(200).json(measurements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const cacheKey = measurementCacheKey(id);

    // 1. Try cache first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    // 2. Cache miss -> query DB
    const measurement = await prisma.measurement.findUnique({
      where: { id },
    });

    if (!measurement) {
      return res.status(404).json({ error: 'Measurement not found' });
    }

    // 3. Populate cache
    await setCache(cacheKey, measurement);

    return res.status(200).json(measurement);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const getMeasurementsByClient = async (req: Request, res: Response) => {
  try {
    const clientId = req.params.clientId;
    const cacheKey = clientMeasurementsCacheKey(clientId);

    // 1. Try cache first
    const cached = await getCache(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    // 2. Cache miss -> query DB
    const measurements = await prisma.measurement.findMany({
      where: { clientId },
      orderBy: { createdAt: 'desc' },
    });

    // 3. Populate cache
    await setCache(cacheKey, measurements);

    return res.status(200).json(measurements);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const validatedData = UpdateMeasurementSchema.safeParse(req.body);
    if (!validatedData.success) {
      return res.status(400).json({ error: validatedData.error.format() });
    }

    const measurement = await prisma.measurement.update({
      where: { id },
      data: validatedData.data,
    });

    // Invalidate the single-measurement cache and the client's list
    await delCache(
      measurementCacheKey(id),
      clientMeasurementsCacheKey(measurement.clientId)
    );

    return res.status(200).json(measurement);
  } catch (error: any) {
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

export const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const measurement = await prisma.measurement.delete({
      where: { id },
    });

    // Invalidate the single-measurement cache and the client's list
    await delCache(
      measurementCacheKey(id),
      clientMeasurementsCacheKey(measurement.clientId)
    );

    return res.status(200).json({ message: 'Measurement deleted successfully' });
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    console.log(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};