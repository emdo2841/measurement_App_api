"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRouter = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("../controller/client");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
const router = express_1.default.Router();
exports.clientRouter = router;
router.post("/", upload.single('image'), client_1.createClient);
router.get("/:id", client_1.getClient);
router.get("/", client_1.getClients);
router.patch("/:id", client_1.updateClient);
router.delete("/:id", client_1.deleteClient);
//# sourceMappingURL=client.route.js.map