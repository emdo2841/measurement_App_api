"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pushRouter = exports.deletesubscription = exports.newSubscrition = exports.publicKey = void 0;
const express_1 = require("express");
const zod_1 = require("zod");
const db_1 = require("../db");
const authMiddleware_1 = require("../middleWare/authMiddleware");
const router = (0, express_1.Router)();
exports.pushRouter = router;
router.use(authMiddleware_1.authenticateToken);
const subscriptionSchema = zod_1.z.object({
    endpoint: zod_1.z.url().max(2048),
    keys: zod_1.z.object({ p256dh: zod_1.z.string().min(1), auth: zod_1.z.string().min(1) }),
});
const publicKey = (_req, res) => {
    const key = process.env.VAPID_PUBLIC_KEY;
    if (!key)
        return res.status(503).json({ error: 'Push is not configured' });
    return res.json({ publicKey: key });
};
exports.publicKey = publicKey;
const newSubscrition = async (req, res) => {
    const parsed = subscriptionSchema.safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.format() });
    const userId = req.user.userId;
    const { endpoint, keys } = parsed.data;
    try {
        await db_1.prisma.pushSubscription.upsert({
            where: { endpoint },
            create: { userId, endpoint, p256dh: keys.p256dh, auth: keys.auth },
            update: { userId, p256dh: keys.p256dh, auth: keys.auth },
        });
        return res.status(201).json({ message: 'Notifications enabled' });
    }
    catch (err) {
        req.log?.error({ err }, 'Could not save push subscription');
        return res.status(500).json({ error: 'Could not save subscription' });
    }
};
exports.newSubscrition = newSubscrition;
const deletesubscription = async (req, res) => {
    const parsed = zod_1.z.object({ endpoint: zod_1.z.url() }).safeParse(req.body);
    if (!parsed.success)
        return res.status(400).json({ error: parsed.error.format() });
    await db_1.prisma.pushSubscription.deleteMany({ where: { endpoint: parsed.data.endpoint, userId: req.user.userId } });
    return res.status(204).send();
};
exports.deletesubscription = deletesubscription;
//# sourceMappingURL=push.js.map