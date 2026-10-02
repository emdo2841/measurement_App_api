import { Request, Response } from "express";
import {prisma} from "../db";
import { createOrderSchema, updateOrderSchema } from "../schemas/OrderSchema";
import { getCache, setCache, delCache } from '../middleWare/cache';
import {
  getPagination,
  paginationMeta,
} from "../Utils/pagination";

const orderCacheKey = (userId: string, id: string) => `order:${userId}:${id}`;
const ordersListCacheKey = (userId: string) => `orders:${userId}:all`;


export const createOrder = async (req: Request, res:Response) => {
    try{
        const validatedData =  createOrderSchema.safeParse(req.body);
        if(!validatedData.success){
            return res.status(400).json({error: validatedData.error.format()});
        }
        const { clientId, ...orderData } = validatedData.data;
        const client = await prisma.client.findFirst({ where: { id: clientId, tailorId: req.user!.userId } });
        if (!client) {
            return res.status(404).json({ error: "Client not found or not owned by user" });
        }
        
        const order = await prisma.order.create({
            data:{
                ...orderData,
                client: { connect: { id: clientId } },
                
            },
            include:{
                client: {
                    select: {
                        id: true,
                        name: true,
                        image: true
                    }
                }
            }
        })
        await delCache(ordersListCacheKey(req.user!.userId));;
        return res.status(201).json({status: "successful", data: order})
    }catch(error){
        req.log.error({ err: error }, 'Delete measurement failed');
        return res.status(500).json({error: "Internal server error"});

    }
}

export const getOrders = async (
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

    const requestedStatus =
      typeof req.query.status === "string"
        ? req.query.status.trim().toUpperCase()
        : "";

    const allowedStatuses = [
      "PENDING",
      "CUTTING",
      "SEWING",
      "FITTING",
      "COMPLETED",
      "DELIVERED",
    ] as const;

    const status = allowedStatuses.find(
      (item) => item === requestedStatus,
    );

    const where = {
      client: {
        tailorId: userId,
      },

      ...(status
        ? {
            status,
          }
        : {}),

      ...(search
        ? {
            OR: [
              {
                client: {
                  name: {
                    contains: search,
                    mode: "insensitive" as const,
                  },
                },
              },
              {
                notes: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
    };

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        skip,
        take: limit,

        orderBy: {
          createdAt: "desc",
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

      prisma.order.count({
        where,
      }),
    ]);

    return res.status(200).json({
      status: "successful",
      data: orders,
      pagination: paginationMeta(
        page,
        limit,
        total,
      ),
    });
  } catch (error) {
    req.log.error(
      { err: error },
      "Get all orders failed",
    );

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const getOrder = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const userId = req.user!.userId;
        const cachedKey = orderCacheKey(userId, id)

         // 1. Try cache first
        const cached = await getCache(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }

        const order = await prisma.order.findFirst({
            where: {id, client: { tailorId: userId }},
             include: {
                 client: {
                     select: {
                        id: true,
                        name: true,
                        image:true
                    }
                    
                }
            }
        })
        return res.status(200).json({status: "successful", data: order})
        if (!order) return res.status(404).json({ error: 'Order not found' });
        await setCache(cachedKey, order);
        return res.status(200).json(order)
    }catch(error) {
        req.log.error({ err: error }, 'get order failed');
        return res.status(500).json({error: "Internal server error"})
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const validatedData = updateOrderSchema.safeParse(req.body)
        if(!validatedData.success){
            return res.status(400).json({error: validatedData.error.format()})
        }
        const {clientId, ...orderData} = validatedData.data
        if (clientId) {
            const client = await prisma.client.findFirst({ where: { id: clientId, tailorId: req.user!.userId } });
            if (!client) return res.status(404).json({ error: 'Client not found' });
        }
        const order = await prisma.order.update({
            where: {id, client: { tailorId: req.user!.userId }},
            data: {
                ...orderData,
                ...(clientId? { client: { connect: { id: clientId } } } : {})
            },
        
        })
        // Invalidate stale cache entries for this user
        await delCache(
            ordersListCacheKey(req.user!.userId),
            orderCacheKey(req.user!.userId, id)
        )
 

        return res.status(200).json({status: "successful", data: order})
    }catch (error){
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({error: 'Order not found'});
       }
        req.log.error({ err: error }, 'update order failed');
        return res.status(500).json({error: "internal server error"})
    }
}

export const deleteOrder = async (req: Request, res: Response) =>{
    try{
         const id = req.params.id;
        const order = await prisma.order.delete({
            where: {id, client: { tailorId: req.user!.userId }}
    })

    // Invalidate stale cache entries for this user
    await delCache(
        ordersListCacheKey(req.user!.userId),
        orderCacheKey(req.user!.userId, id));

    return res.status(200).json({message : "order deleted successfully"})
    }catch(error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({error: 'Order not found'});
       }
        req.log.error({ err: error }, 'Delete order failed');
        return res.status(500).json({error: "internal server error"})
    }
   
    
}