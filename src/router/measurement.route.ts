import express from "express";
import {getAllMeasurements, createMeasurement, getMeasurement, getMeasurementByClient, updateMeasurement, deleteMeasurement, restoreMeasurementHistory, getMeasurementHistory } from "../controller/measurement";
import { authenticateToken } from "../middleWare/authMiddleware";

const router = express.Router();
router.use(authenticateToken);

router.post("/", createMeasurement);
router.get("/", getAllMeasurements);
router.get("/client/:clientId", getMeasurementByClient);
router.get('/:id/history', getMeasurementHistory)
router.post('/:id/history/:historyId/restore', restoreMeasurementHistory)

router.get("/:id", getMeasurement);
router.patch("/:id", updateMeasurement);
router.delete("/:id", deleteMeasurement);

export { router as measurementtRouter };