// import pinoHttp from 'pino-http';
// import compression from 'compression';
// import express = require('express');
// import type { Request, Response, NextFunction } from 'express';
// import cookieParser from "cookie-parser"
// import { generalApiLimiter, authLimiter  } from './middleWare/rateLimiters';
// import 'dotenv/config';
// import helmet from 'helmet';

// import type { IncomingMessage, ServerResponse } from 'http';


// import { prisma } from './db';
// import { userRouter } from './router/user.route';
// import { clientRouter } from './router/client.route';
// import { orderRouter } from './router/order.route';
// import { authRouter } from './router/auth.route';
// import {verifySmtpConnection} from "./Utils/mail"

// // Verify SMTP connection on server startup


// verifySmtpConnection()
// const app = express();
// app.set('trust proxy', 1 /* number of proxies between user and server */)


// // 1. Initialize Pino HTTP logger
// const httpLogger = pinoHttp({
//   // Pretty-print in development mode
//   transport:
//     process.env.NODE_ENV !== 'production'
//       ? {
//           target: 'pino-pretty',
//           options: {
//             colorize: true,
//             translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
//             ignore: 'pid,hostname',
//           },
//         }
//       : undefined,

//   // Redact sensitive headers from log output
//   redact: {
//     paths: ['req.headers.authorization', 'req.headers.cookie', 'req.headers["x-auth-token"]'],
//     remove: true,
//   },

//   // Custom log levels based on response status codes
//   customLogLevel: (req: IncomingMessage, res: ServerResponse, err?: Error) => {
//   if (res.statusCode >= 500 || err) return 'error';
//   if (res.statusCode >= 400) return 'warn';
//   return 'info';
// },
// });

// // 2. Attach Pino HTTP logger early in the middleware pipeline
// app.use(httpLogger);

// app.use(helmet());
// app.use(compression());
// app.use(express.json());

// const port = 8000;
// const appName = process.env.APP_NAME

// app.use(cookieParser())

// app.disable('x-powered-by');

// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//     if (err.type === "entity.parse.failed" || err instanceof SyntaxError) {
//         return res.status(400).json({ error: "Invalid JSON in request body" });
//     }
//     console.error(err);
//     return res.status(500).json({ error: "Internal server error" });
// });


// // app.use('/', (req: Request, res: Response) => {
// //     res.status(200).end("hello World");
// //     console.log(`Request served by ${appName}`);
// // });
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/clients", clientRouter);
// app.use("/api/v1/orders", orderRouter)
// app.use("/api/v1/auth",authLimiter, authRouter)
// app.get("/", async (req: Request, res: Response) => {
    
//     res.status(201).json({
//         message: `Welcome to ${appName}`,
//         status: "success",
//         data: {
//             users: await prisma.user.findMany()
//         } 
//     });
// });
// app.get('/ip', (req: Request, res: Response) => {
// 	res.send(req.ip);
// });

// // 3. 404 Route Handler
// app.use((req: Request, res: Response) => {
//   req.log.warn({ url: req.originalUrl }, 'Route not found');
//   res.status(404).json({ error: "Sorry, can't find that!" });
// });

// // 4. Centralized Error Handling Middleware (Must be defined LAST)
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
//     req.log.warn({ err }, 'JSON body parse failure');
//     return res.status(400).json({ error: 'Invalid JSON in request body' });
//   }

//   // Log full stack trace with request context
//   req.log.error(err, 'Unhandled Application Error');
//   return res.status(500).json({ error: 'Internal server error' });
// });
// app.listen(port, () => {
//     console.log(`${appName} is listening on port ${port}`);
// });

import app from './app';
import { verifySmtpConnection } from "./Utils/mail";

const port = process.env.PORT || 8000;
const appName = process.env.APP_NAME || 'App';

verifySmtpConnection();

app.listen(port, () => {
  console.log(`${appName} is listening on port ${port}`);
});