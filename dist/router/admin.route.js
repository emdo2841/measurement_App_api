"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleWare/authMiddleware");
const router = express_1.default.router();
exports.adminRouter = router;
router.use(authMiddleware_1.authenticateToken, requireAdmin, adminRouter);
router.get('/admin/dashboard');
router.get('/admin/users/');
router.get('/admin/users/:id');
router.patch('/admin/users/:id/role');
router.patch('/admin/users/:id/status');
router.patch('/admin/users/:id/report-setting');
router.delete('/admin/users/:id');
router.post('admin/emails/preview');
router.post('admin/emails/send');
router.get('admin/emails/:campaignId');
router.post('admin/users/:id/reports');
router.get('admin/users/:id/reports');
//# sourceMappingURL=admin.route.js.map