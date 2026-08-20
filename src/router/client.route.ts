import express from "express";
import { createClient, getClient, getClients, updateClient, deleteClient } from "../controller/client";
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

const router = express.Router();

router.post("/", upload.single('image'), createClient);
router.get("/:id", getClient);
router.get("/", getClients);
router.patch("/:id", updateClient);
router.delete("/:id", deleteClient);

export { router as clientRouter };