import type { Request, Response } from 'express'
import { createHash, randomBytes } from 'node:crypto'
import { prisma } from '../db'

function hashShareToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export const createMeasurementShare = async (
  req: Request,
  res: Response,
) => {
  try {
    const measurementId = req.params.id
    const userId = req.user!.userId

    const requestedDays = Number(req.body?.expiresInDays ?? 7)

    if (
      !Number.isInteger(requestedDays) ||
      requestedDays < 1 ||
      requestedDays > 30
    ) {
      return res.status(400).json({
        error: 'Expiry must be between 1 and 30 days.',
      })
    }

    const measurement = await prisma.measurement.findFirst({
      where: {
        id: measurementId,
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
        error: 'Measurement not found.',
      })
    }

    const token = randomBytes(32).toString('base64url')
    const tokenHash = hashShareToken(token)

    const expiresAt = new Date(
      Date.now() + requestedDays * 24 * 60 * 60 * 1000,
    )

    const share = await prisma.measurementShare.create({
      data: {
        measurementId: measurement.id,
        tokenHash,
        expiresAt,
      },
    })

    const frontendUrl = (
  process.env.FRONTEND_URL ?? 'http://localhost:5173'
).replace(/\/+$/, '')

const shareUrl =
  `${frontendUrl}/shared/measurements/${token}`

    return res.status(201).json({
      status: 'successful',
      data: {
        shareId: share.id,
        shareUrl,
        expiresAt: share.expiresAt,
      },
    })
  } catch (error) {
    req.log.error({ err: error }, 'Create measurement share failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}

export const getSharedMeasurement = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = req.params.token
    const tokenHash = hashShareToken(token)

    const share = await prisma.measurementShare.findFirst({
      where: {
        tokenHash,
        revokedAt: null,
        OR: [
          {
            expiresAt: null,
          },
          {
            expiresAt: {
              gt: new Date(),
            },
          },
        ],
      },
      select: {
        expiresAt: true,
        measurement: {
          select: {
            title: true,
            unit: true,
            data: true,
            updatedAt: true,
            client: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    if (!share) {
      return res.status(404).json({
        error: 'This share link is invalid, expired or revoked.',
      })
    }

    return res.status(200).json({
      status: 'successful',
      data: {
        title: share.measurement.title,
        unit: share.measurement.unit,
        data: share.measurement.data,
        updatedAt: share.measurement.updatedAt,
        expiresAt: share.expiresAt,
        client: {
          name: share.measurement.client.name,
        },
      },
    })
  } catch (error) {
    req.log.error({ err: error }, 'Get shared measurement failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}

export const revokeMeasurementShare = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id: measurementId, shareId } = req.params
    const userId = req.user!.userId

    const share = await prisma.measurementShare.findFirst({
      where: {
        id: shareId,
        measurementId,
        measurement: {
          client: {
            tailorId: userId,
          },
        },
      },
      select: {
        id: true,
      },
    })

    if (!share) {
      return res.status(404).json({
        error: 'Share link not found.',
      })
    }

    await prisma.measurementShare.update({
      where: {
        id: share.id,
      },
      data: {
        revokedAt: new Date(),
      },
    })

    return res.status(200).json({
      message: 'Share link revoked successfully.',
    })
  } catch (error) {
    req.log.error({ err: error }, 'Revoke measurement share failed')

    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}