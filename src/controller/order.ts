import { Request, Response } from "express";
import {prisma} from "../db";
import { createOrderSchema, updateOrderSchema } from "../schemas/OrderSchema";


export const createOrder = async (req: Request, res:Response) => {
    try{
        const validatedData =  createOrderSchema.safeParse(req.body);
        if(!validatedData.success){
            return res.status(400).json({error: validatedData.error.format()});
        }
        const { clientId, ...orderData } = validatedData.data;
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
        return res.status(201).json(order)
    }catch(error){
        console.log({"error":error})
        return res.status(500).json({error: "Internal server error"});

    }
}

export const getOrders = async (req: Request, res: Response) =>{
    try{
        const order = await prisma.order.findMany({
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
        const order = await prisma.order.findUnique({
            where: {id},
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
        const order = await prisma.order.update({
            where: {id},
            data: {
                ...orderData,
                ...(clientId? { client: { connect: { id: clientId } } } : {})
            },
        
        })
        return res.status(200).json(order)
    }catch (error){
        console.log(error)
        return res.status(500).json({error: "internal server error"})
    }
}

export const deleteOrder = async (req: Request, res: Response) =>{
    try{
         const id = req.params.id;
        const order = await prisma.order.delete({
            where: {id}
    })
    return res.status(200).json({message : "order deleted successfully"})
    }catch(error) {
        console.log(error)
        return res.status(500).json({error: "internal server error"})
    }
   
    
}