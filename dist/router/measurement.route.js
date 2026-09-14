"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.measurementtRouter = void 0;
const express_1 = __importDefault(require("express"));
const measurement_1 = require("../controller/measurement");
const router = express_1.default.Router();
exports.measurementtRouter = router;
router.post("/", measurement_1.createMeasurement);
router.get("/", measurement_1.getAllMeasurements);
router.get("/id", measurement_1.getMeasurement);
router.get("/:id", measurement_1.getMeasurementsByClient);
router.patch("/:id", measurement_1.updateMeasurement);
router.delete("/:id", measurement_1.deleteMeasurement);
//# sourceMappingURL=measurement.route.js.map