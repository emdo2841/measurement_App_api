"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controller/auth");
const router = express_1.default.Router();
exports.authRouter = router;
router.post("/login", auth_1.login);
router.post("/google", auth_1.googleLogin);
router.post("/logout", auth_1.logout);
router.post("/refresh-token", auth_1.refreshToken);
router.post("/forgot-password", auth_1.forgotPassword);
router.post("/reset-password", auth_1.resetPassword);
//# sourceMappingURL=auth.route.js.map