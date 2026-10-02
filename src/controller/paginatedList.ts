import type { Request, Response } from 'express'
import { prisma } from '../db'
import { getCache, setCache } from '../middleWare/cache'
import { paginatedListCacheKey } from '../middleWare/paginatedCache'
import { getPagination, paginationMeta } from '../Utils/pagination'

const CACHE_TTL_SECONDS = 60

function authenticatedUserId(req: Request) {
  const userId = req.user?.userId
  if (!userId) throw new Error('UNAUTHORIZED')
  return userId
}

export async function getClientsPaginated(req: Request, res: Response) {
  try {
    const userId = authenticatedUserId(req)
    const { page, limit, skip } = getPagination(req.query)
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const cacheKey = await paginatedListCacheKey('clients', userId, { page, limit, search })
    const cached = await getCache(cacheKey)
    if (cached) return res.status(200).json(cached)

    const where = {
      tailorId: userId,
      ...(search ? { OR: [
        { name: { contains: search, mode: 'insensitive' as const } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' as const } },
        { address: { contains: search, mode: 'insensitive' as const } },
      ] } : {}),
    }

    const [data, total] = await prisma.$transaction([
      prisma.client.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { measurement: true, orders: { select: { id: true, dueDate: true, status: true, totalAmount: true } } } }),
      prisma.client.count({ where }),
    ])
    const payload = { status: 'successful', data, pagination: paginationMeta(page, limit, total) }
    await setCache(cacheKey, payload, CACHE_TTL_SECONDS)
    return res.status(200).json(payload)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') return res.status(401).json({ error: 'Unauthorized access' })
    req.log.error({ err: error }, 'Get clients failed')
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getOrdersPaginated(req: Request, res: Response) {
  try {
    const userId = authenticatedUserId(req)
    const { page, limit, skip } = getPagination(req.query)
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const status = typeof req.query.status === 'string' && req.query.status !== 'ALL' ? req.query.status : undefined
    const cacheKey = await paginatedListCacheKey('orders', userId, { page, limit, search, status })
    const cached = await getCache(cacheKey)
    if (cached) return res.status(200).json(cached)

    const where = {
      client: { tailorId: userId },
      ...(status ? { status: status as 'PENDING' | 'CUTTING' | 'SEWING' | 'FITTING' | 'COMPLETED' | 'DELIVERED' } : {}),
      ...(search ? { OR: [
        { client: { name: { contains: search, mode: 'insensitive' as const } } },
        { notes: { contains: search, mode: 'insensitive' as const } },
      ] } : {}),
    }

    const [data, total] = await prisma.$transaction([
      prisma.order.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' }, include: { client: { select: { id: true, name: true, image: true } } } }),
      prisma.order.count({ where }),
    ])
    const payload = { status: 'successful', data, pagination: paginationMeta(page, limit, total) }
    await setCache(cacheKey, payload, CACHE_TTL_SECONDS)
    return res.status(200).json(payload)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') return res.status(401).json({ error: 'Unauthorized access' })
    req.log.error({ err: error }, 'Get orders failed')
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export async function getMeasurementsPaginated(req: Request, res: Response) {
  try {
    const userId = authenticatedUserId(req)
    const { page, limit, skip } = getPagination(req.query)
    const search = typeof req.query.search === 'string' ? req.query.search.trim() : ''
    const cacheKey = await paginatedListCacheKey('measurements', userId, { page, limit, search })
    const cached = await getCache(cacheKey)
    if (cached) return res.status(200).json(cached)

    const where = {
      client: { tailorId: userId },
      ...(search ? { OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { client: { name: { contains: search, mode: 'insensitive' as const } } },
      ] } : {}),
    }

    const [data, total] = await prisma.$transaction([
      prisma.measurement.findMany({ where, skip, take: limit, orderBy: { updatedAt: 'desc' }, include: { client: { select: { id: true, name: true, image: true } } } }),
      prisma.measurement.count({ where }),
    ])
    const payload = { status: 'successful', data, pagination: paginationMeta(page, limit, total) }
    await setCache(cacheKey, payload, CACHE_TTL_SECONDS)
    return res.status(200).json(payload)
  } catch (error) {
    if (error instanceof Error && error.message === 'UNAUTHORIZED') return res.status(401).json({ error: 'Unauthorized access' })
    req.log.error({ err: error }, 'Get measurements failed')
    return res.status(500).json({ error: 'Internal server error' })
  }
}
