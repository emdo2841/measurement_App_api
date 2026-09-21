import express from "express";
import { createOrder, getOrders, updateOrder, getOrder, deleteOrder } from "../controller/order";
import { authenticateToken } from '../middleWare/authMiddleware';

const router = express.Router()
router.use(authenticateToken)

router.post("/", createOrder)
router.get("/", getOrders )
router.get("/:id", getOrder)
router.patch("/:id", updateOrder)
router.delete("/:id", deleteOrder)

export{router as orderRouter}