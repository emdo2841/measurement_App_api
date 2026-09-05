import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import pinoHttp from 'pino-http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'dotenv/config';

import { publicLimiter, authLimiter } from "./middleWare/rateLimiters";
import { prisma } from './db';
import { userRouter } from './router/user.route';
import { clientRouter } from './router/client.route';
import { orderRouter } from './router/order.route';
import { authRouter } from './router/auth.route';
import { measurementtRouter } from './router/measurement.route';

const app = express();
app.set('trust proxy', 1);

if (process.env.NODE_ENV !== 'test') {
  app.use(pinoHttp());
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');

// Routes protected by limiters
app.use("/api/v1/users", publicLimiter, userRouter);
app.use("/api/v1/clients", publicLimiter, clientRouter);
app.use("/api/v1/orders", publicLimiter, orderRouter);
app.use("/api/v1/measurement", publicLimiter, measurementtRouter);
app.use("/api/v1/auth", authLimiter, authRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Welcome to ${process.env.APP_NAME || 'App'}`,
    status: "success",
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Sorry, can't find that!" });
});

// Central Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

export default app;