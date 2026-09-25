import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { authenticateToken } from '../middleWare/authMiddleware';
import { newSubscrition, publicKey, deletesubscription } from '../controller/push';

const router = Router();
router.use(authenticateToken);

const subscriptionSchema = z.object({
  endpoint: z.url().max(2048),
  keys: z.object({ p256dh: z.string().min(1), auth: z.string().min(1) }),
});

router.get('/public-key', publicKey );

router.post('/subscriptions', newSubscrition );

router.delete('/subscriptions', deletesubscription);

export { router as pushRouter }