import express from "express";
import { createOrder, getOrders, updateOrder, getOrder, deleteOrder } from "../controller/order";

const router = express.Router()

router.post("/", createOrder)
router.get("/", getOrders )
router.get("/:id", getOrder)
router.patch("/:id", updateOrder)
router.delete("/:id", deleteOrder)

export{router as orderRouter}