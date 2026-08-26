import express from "express";
import {getAllMeasurements, createMeasurement, getMeasurement, getMeasurementsByClient, updateMeasurement, deleteMeasurement } from "../controller/measurement";

const router = express.Router();

router.post("/", createMeasurement);
router.get("/", getAllMeasurements);
router.get("/id", getMeasurement);
router.get("/:id", getMeasurementsByClient);
router.patch("/:id", updateMeasurement);
router.delete("/:id", deleteMeasurement);

export { router as measurementtRouter };