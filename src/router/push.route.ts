import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticateToken } from '../middleWare/authMiddleware';

const router = Router();
router.use(authenticateToken);

const subscriptionSchema = z.object({
  endpoint: z.url().max(2048),
  keys: z.object({ p256dh: z.string().min(1), auth: z.string().min(1) }),
});

router.get('/public-key', (_req, res) => {
  const key = process.env.VAPID_PUBLIC_KEY;
  if (!key) return res.status(503).json({ error: 'Push is not configured' });
  return res.json({ publicKey: key });
});

router.post('/subscriptions', async (req, res) => {
  const parsed = subscriptionSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });
  const userId = req.user!.userId;
  const { endpoint, keys } = parsed.data;
  try {
    await prisma.pushSubscription.upsert({
      where: { endpoint },
      create: { userId, endpoint, p256dh: keys.p256dh, auth: keys.auth },
      update: { userId, p256dh: keys.p256dh, auth: keys.auth },
    });
    return res.status(201).json({ message: 'Notifications enabled' });
  } catch (err) {
    req.log?.error({ err }, 'Could not save push subscription');
    return res.status(500).json({ error: 'Could not save subscription' });
  }
});

router.delete('/subscriptions', async (req, res) => {
  const parsed = z.object({ endpoint: z.url() }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.format() });
  await prisma.pushSubscription.deleteMany({ where: { endpoint: parsed.data.endpoint, userId: req.user!.userId } });
  return res.status(204).send();
});

export { router as pushRouter }