"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushRouter = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const authMiddleware_1 = require("../middleWare/authMiddleware");
const push_1 = require("../controller/push");
const router = (0, express_1.Router)();
exports.pushRouter = router;
router.use(authMiddleware_1.authenticateToken);
const subscriptionSchema = zod_1.z.object({
    endpoint: zod_1.z.url().max(2048),
    keys: zod_1.z.object({ p256dh: zod_1.z.string().min(1), auth: zod_1.z.string().min(1) }),
});
router.get('/public-key', push_1.publicKey);
router.post('/subscriptions', push_1.newSubscrition);
router.delete('/subscriptions', push_1.deletesubscription);
//# sourceMappingURL=push.route.js.map