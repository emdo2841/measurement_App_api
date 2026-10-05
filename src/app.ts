import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import 'dotenv/config';

import { publicLimiter, authLimiter } from "./middleWare/rateLimiters";
import { userRouter } from './router/user.route';
import { clientRouter } from './router/client.route';
import { orderRouter } from './router/order.route';
import { authRouter } from './router/auth.route';
import { measurementtRouter } from './router/measurement.route';
import { pushRouter } from './router/push.route';
import { measurementShareRouter } from './router/measurementShare.route'
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


const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:8081',
  'http://127.0.0.1:8081',
  'https://ejtech.duckdns.org',
  'https://ejtailorpro.ejtech.workers.dev'
];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    // Requests from Postman, curl and server-to-server calls
    // normally do not include an Origin header.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    reqLoggerWarning(origin);

    return callback(
      new Error(`Origin ${origin} is not allowed by CORS`),
    );
  },

  credentials: true,

  methods: [
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization',
  ],

  exposedHeaders: [
    'RateLimit',
    'RateLimit-Policy',
    'Retry-After',
  ],

  optionsSuccessStatus: 204,
};

function reqLoggerWarning(origin: string) {
  logger.warn(
    { origin },
    'Request blocked by CORS',
  );
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.disable('x-powered-by');


// Routes protected by limiters
app.use("/api/v1/users", publicLimiter, userRouter);
app.use("/api/v1/clients",  publicLimiter, clientRouter);
app.use("/api/v1/orders", publicLimiter, orderRouter);
app.use("/api/v1/measurement", publicLimiter, measurementtRouter);
app.use("/api/v1/auth", authLimiter, authRouter);
app.use('/api/v1/push',  publicLimiter, pushRouter);
app.use('/api/v1', publicLimiter, measurementShareRouter)

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
    return res.status(400).json({ error: "Invalid JSON in request body!" });
  }

  req.log.error({ err }, "Unhandled request error!");
  return res.status(500).json({ error: "Internal server error" });
});

export default app;