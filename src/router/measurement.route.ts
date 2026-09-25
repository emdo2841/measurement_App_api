import express from "express";
import {getAllMeasurements, createMeasurement, getMeasurement, getMeasurementsByClient, updateMeasurement, deleteMeasurement } from "../controller/measurement";
import { authenticateToken } from "../middleWare/authMiddleware";

const router = express.Router();
router.use(authenticateToken);

router.post("/", createMeasurement);
router.get("/", getAllMeasurements);
router.get("/client/:clientId", getMeasurementsByClient);
+router.get("/:id", getMeasurement);
router.patch("/:id", updateMeasurement);
router.delete("/:id", deleteMeasurement);

export { router as measurementtRouter };