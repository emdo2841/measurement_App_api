import type { Request, Response, NextFunction } from 'express'
import { prisma } from '../db'

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({
        error: 'Authentication required.',
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        platformRole: true,
        accountStatus: true,
      },
    })

    if (
      !user ||
      user.platformRole !== 'ADMIN' ||
      user.accountStatus !== 'ACTIVE'
    ) {
      return res.status(403).json({
        error: 'Administrator access required.',
      })
    }

    next()
  } catch (error) {
    next(error)
  }
}