"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = __importDefault(require("express"));
const order_1 = require("../controller/order");
const authMiddleware_1 = require("../middleWare/authMiddleware");
const router = express_1.default.Router();
exports.orderRouter = router;
router.use(authMiddleware_1.authenticateToken);
router.post("/", order_1.createOrder);
router.get("/", order_1.getOrders);
router.get("/:id", order_1.getOrder);
router.patch("/:id", order_1.updateOrder);
router.delete("/:id", order_1.deleteOrder);
//# sourceMappingURL=order.route.js.map