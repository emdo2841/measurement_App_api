import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import pinoHttp from 'pino-http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'dotenv/config';

import { prisma } from './db';
import { userRouter } from './router/user.route';
import { clientRouter } from './router/client.route';
import { orderRouter } from './router/order.route';
import { authRouter } from './router/auth.route';

const app = express();
app.set('trust proxy', 1);

// Disable pino logs during testing to keep test output clean
if (process.env.NODE_ENV !== 'test') {
  app.use(pinoHttp());
}

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');

// Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/clients", clientRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({
    message: `Welcome to ${process.env.APP_NAME || 'App'}`,
    status: "success",
    data: {
      users: await prisma.user.findMany()
    } 
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Sorry, can't find that!" });
});

// Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  return res.status(500).json({ error: 'Internal server error' });
});

export default app;