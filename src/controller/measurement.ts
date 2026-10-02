import type { Request, Response } from 'express';
import { Prisma } from '../generated/prisma/client'
import { prisma } from '../db';
import { getCache, setCache, delCache } from '../middleWare/cache';
import {
  createMeasurementSchema,
  UpdateMeasurementSchema,
} from '../schemas/measurement.schema'; // adjust path to wherever your zod file lives
import {paginationMeta,getPagination,} from "../Utils/pagination";

const measurementCacheKey = (userId: string, id: string) => `measurement:${userId}:${id}`;
const clientMeasurementsCacheKey = (userId: string, clientId: string) =>
  `measurements:${userId}:client:${clientId}`;
const allMeasurementsCacheKey = (userId: string) => `measurements:${userId}:all`;
const measurementDataToInput = (
  value: Prisma.JsonValue,
): Prisma.InputJsonObject => {
  if (
    value === null ||
    Array.isArray(value) ||
    typeof value !== 'object'
  ) {
    throw new Error('Measurement data must be a JSON object')
  }

  const entries = Object.entries(value)

  const containsInvalidValue = entries.some(
    ([, measurementValue]) =>
      typeof measurementValue !== 'number' ||
      !Number.isFinite(measurementValue),
  )

  if (containsInvalidValue) {
    throw new Error(
      'Every measurement field must contain a valid number',
    )
  }

  return Object.fromEntries(entries) as Prisma.InputJsonObject
}

export const createMeasurement = async (
  req: Request,
  res: Response,
) => {
  try {
    const validatedData =
      createMeasurementSchema.safeParse(req.body)

    if (!validatedData.success) {
      return res.status(400).json({
        error: validatedData.error.format(),
      })
    }

    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({
        error: 'Unauthorized access',
      })
    }

    const { clientId } = validatedData.data

    // Confirm that the client belongs to the logged-in tailor.
    const client = await prisma.client.findFirst({
  where: {
    id: clientId,
    tailorId: userId,
  },
  select: {
    id: true,
  },
})

    if (!client) {
      return res.status(404).json({
        error: 'Client not found',
      })
    }

    const measurement = await prisma.measurement.create({
      data: validatedData.data,
    })

    await delCache(
      clientMeasurementsCacheKey(userId, clientId),
      allMeasurementsCacheKey(userId),
      `clients:${userId}:all`,
      `client:${userId}:${clientId}`,
    )

    return res.status(201).json({
      status: 'successful',
      data: measurement,
    })
  } catch (error: unknown) {
    req.log.error(
      { err: error },
      'Create measurement failed',
    )

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}

export const getAllMeasurements = async (
  req: Request,
  res: Response,
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized access",
      });
    }

    const { page, limit, skip } = getPagination(req.query);

    const search =
      typeof req.query.search === "string"
        ? req.query.search.trim()
        : "";

    const where = {
      client: {
        tailorId: userId,
      },

      ...(search
        ? {
            OR: [
              {
                title: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                client: {
                  name: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
            ],
          }
        : {}),
    };

    const [measurements, total] =
      await prisma.$transaction([
        prisma.measurement.findMany({
          where,
          skip,
          take: limit,
          orderBy: {
            updatedAt: "desc",
          },
          include: {
            client: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        }),

        prisma.measurement.count({
          where,
        }),
      ]);

    return res.status(200).json({
      status: "successful",
      data: measurements,
      pagination: paginationMeta(
        page,
        limit,
        total,
      ),
    });
  } catch (error) {
    req.log.error(
      { err: error },
      "Get measurements failed",
    );

    return res.status(500).json({
      error: "Internal server error",
    });
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
      include: {
        client: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      }
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

export const getMeasurementByClient = async (
  req: Request,
  res: Response,
) => {
  try {
    const clientId = req.params.clientId
    const userId = req.user!.userId

    const client = await prisma.client.findFirst({
      where: {
        id: clientId,
        tailorId: userId,
      },
      select: {
        id: true,
      },
    })

    if (!client) {
      return res.status(404).json({
        error: 'Client not found',
      })
    }

    const measurements = await prisma.measurement.findMany({
       where: {
         clientId,
       },
      orderBy: {
        updatedAt: 'desc',
      },
     })

    return res.status(200).json({
      status: 'successful',
      data: measurements,
    })
  } catch (error) {
    req.log.error({ err: error }, 'Get client measurement failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}
export const getMeasurementHistory = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id
    const userId = req.user!.userId

    const measurement = await prisma.measurement.findFirst({
      where: {
        id,
        client: {
          tailorId: userId,
        },
      },
      select: {
        id: true,
      },
    })

    if (!measurement) {
      return res.status(404).json({
        error: 'Measurement not found',
      })
    }

    const history = await prisma.measurementHistory.findMany({
      where: {
        measurementId: measurement.id,
      },
      orderBy: {
        recordedAt: 'desc',
      },
    })

    return res.status(200).json({
      status: 'successful',
      data: history,
    })
  } catch (error) {
    req.log.error({ err: error }, 'Get measurement history failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}
export const restoreMeasurementHistory = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id, historyId } = req.params
    const userId = req.user!.userId

    const current = await prisma.measurement.findFirst({
      where: {
        id,
        client: {
          tailorId: userId,
        },
      },
    })

    if (!current) {
      return res.status(404).json({
        error: 'Measurement not found',
      })
    }

    const historicalVersion =
      await prisma.measurementHistory.findFirst({
        where: {
          id: historyId,
          measurementId: current.id,
        },
      })

    if (!historicalVersion) {
      return res.status(404).json({
        error: 'Measurement history entry not found',
      })
    }

    const restored = await prisma.$transaction(async (database) => {
      // Preserve the current version before restoring the older one.
      await database.measurementHistory.create({
        data: {
          measurementId: current.id,
          title: current.title,
          unit: current.unit,
          data: measurementDataToInput(current.data),
        },
      })

      return database.measurement.update({
        where: {
          id: current.id,
        },
        data: {
          title: historicalVersion.title,
          unit: historicalVersion.unit,
          data: measurementDataToInput(historicalVersion.data),
        },
      })
    })

    await delCache(
      measurementCacheKey(userId, current.id),
      clientMeasurementsCacheKey(userId, current.clientId),
      allMeasurementsCacheKey(userId),
    )

    return res.status(200).json({
      status: 'successful',
      data: restored,
    })
  } catch (error) {
    req.log.error({ err: error }, 'Restore measurement failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}

export const updateMeasurement = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = req.params.id
    const userId = req.user!.userId

    const validatedData = UpdateMeasurementSchema.safeParse(req.body)

    if (!validatedData.success) {
      return res.status(400).json({
        error: validatedData.error.format(),
      })
    }

    const existingMeasurement = await prisma.measurement.findFirst({
      where: {
        id,
        client: {
          tailorId: userId,
        },
      },
    })

    if (!existingMeasurement) {
      return res.status(404).json({
        error: 'Measurement not found',
      })
    }

    // Do not allow moving a measurement to another client.
    const { clientId: _ignoredClientId, ...updateData } =
      validatedData.data

    const measurement = await prisma.$transaction(async (database) => {
      // Save the current values before changing them.
      await database.measurementHistory.create({
        data: {
          measurementId: existingMeasurement.id,
          title: existingMeasurement.title,
          unit: existingMeasurement.unit,
          data: measurementDataToInput(existingMeasurement.data),
        },
      })

      return database.measurement.update({
        where: {
          id: existingMeasurement.id,
        },
        data: updateData,
      })
    })

    await delCache(
      measurementCacheKey(userId, id),
      clientMeasurementsCacheKey(
        userId,
        existingMeasurement.clientId,
      ),
      allMeasurementsCacheKey(userId),
    )

    return res.status(200).json({
      status: 'successful',
      data: measurement,
    })
  } catch (error: unknown) {
    req.log.error({ err: error }, 'Update measurement failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}

export const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userId = req.user!.userId;

    const existingMeasurement = await prisma.measurement.findFirst({
      where: { id, client: { tailorId: userId } },
      select: { id: true, clientId: true },
    });
    if (!existingMeasurement) {
  return res.status(404).json({
    error: 'Measurement not found',
  })
}

await prisma.measurement.delete({
  where: {
    id: existingMeasurement.id,
  },
})

await delCache(
  measurementCacheKey(userId, id),
  clientMeasurementsCacheKey(
    userId,
    existingMeasurement.clientId,
  ),
  allMeasurementsCacheKey(userId),
)

return res.status(200).json({
  message: 'Measurement deleted successfully',
})
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Measurement not found' });
    }
    req.log.error({ err: error }, 'Delete measurement failed');
    return res.status(500).json({ error: 'Internal server error' });
  }
};