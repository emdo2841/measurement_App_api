"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.measurementShareRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleWare/authMiddleware");
const measurementShare_1 = require("../controller/measurementShare");
const router = express_1.default.Router();
exports.measurementShareRouter = router;
// Public: the recipient does not need to log in.
router.get('/shared/measurements/:token', measurementShare_1.getSharedMeasurement);
// Protected: only the owning tailor can create a link.
router.post('/measurement/:id/share', authMiddleware_1.authenticateToken, measurementShare_1.createMeasurementShare);
// Protected: only the owning tailor can revoke a link.
router.delete('/measurement/:id/share/:shareId', authMiddleware_1.authenticateToken, measurementShare_1.revokeMeasurementShare);
//# sourceMappingURL=measurementShare.route.js.map