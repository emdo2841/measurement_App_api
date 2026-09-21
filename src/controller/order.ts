import { Request, Response } from "express";
import {prisma} from "../db";
import { createOrderSchema, updateOrderSchema } from "../schemas/OrderSchema";
import { getCache, setCache, delCache } from '../middleWare/cache';

const orderCacheKey = (id: string) => `order:${id}`;
const ORDERS_LIST_CACHE_KEY = 'orders:all';


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
        await delCache(ORDERS_LIST_CACHE_KEY);
        return res.status(201).json(order)
    }catch(error){
        console.log({"error":error})
        return res.status(500).json({error: "Internal server error"});

    }
}

export const getOrders = async (req: Request, res: Response) =>{
    try{

        const order = await prisma.order.findMany({
             where: { client: { tailorId: req.user!.userId } },
            include: {
                client: {
                    select:{
                        id: true,
                        name:true,
                        image:true
                    }
                }
            }
        })
        return res.status(200).json(order)
    }catch(error){
        console.log(error)
        return res.status(500).json({error: "internal server error"})
    }
}

export const getOrder = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const cachedKey = orderCacheKey(id)

         // 1. Try cache first
        const cached = await getCache(cachedKey);
        if (cached) {
            return res.status(200).json(cached);
        }

        const order = await prisma.order.findFirst({
            where: {id, client: { tailorId: req.user!.userId }},
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
        return res.status(200).json(order)
        if (!order) return res.status(404).json({ error: 'Order not found' });
         return res.status(200).json(order)
    }catch(error) {
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
        await delCache(ORDERS_LIST_CACHE_KEY, orderCacheKey(id))

        return res.status(200).json(order)
    }catch (error){
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({error: 'Order not found'});
       }
        console.log(error)
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
    await delCache(ORDERS_LIST_CACHE_KEY, orderCacheKey(id));

    return res.status(200).json({message : "order deleted successfully"})
    }catch(error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2025') {
            return res.status(404).json({error: 'Order not found'});
       }
        console.log(error)
        return res.status(500).json({error: "internal server error"})
    }
   
    
}