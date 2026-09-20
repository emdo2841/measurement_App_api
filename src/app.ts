import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
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
import { logger } from "./logger";

const app = express();
app.set('trust proxy', 1);

app.use(pinoHttp({
  logger,
  customLogLevel: (_req, res, err) => {
    if (err || res.statusCode >= 500) return "error";
    if (res.statusCode >= 400) return "warn";
    return "info";
  },
}));

app.use(helmet());
app.use(compression());


app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:8081'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
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
    status: "successful",
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Sorry, can't find that!" });
});

// Central Error Handler
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (
    (typeof err === "object" && err !== null && "type" in err &&
      err.type === "entity.parse.failed") ||
    err instanceof SyntaxError
  ) {
    req.log.warn({ err }, "Invalid JSON in request body");
    return res.status(400).json({ error: "Invalid JSON in request body" });
  }

  req.log.error({ err }, "Unhandled request error");
  return res.status(500).json({ error: "Internal server error" });
});

export default app;