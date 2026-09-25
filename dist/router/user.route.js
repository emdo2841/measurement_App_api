"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
const authMiddleware_1 = require("../middleWare/authMiddleware");
const router = express_1.default.Router();
exports.userRouter = router;
// Registration must remain public. Every route declared after router.use is protected.
router.post("/", upload.single("image"), user_1.createUser);
router.use(authMiddleware_1.authenticateToken);
router.get("/profile", user_1.profile);
router.post("/", upload.single("image"), user_1.createUser);
router.get("/:id", user_1.getUser);
router.patch("/:id", user_1.updateUser);
router.delete("/:id", user_1.deleteUser);
//# sourceMappingURL=user.route.js.map