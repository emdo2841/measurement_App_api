"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mail_1 = require("./Utils/mail");
const redisClient_1 = require("./middleWare/redisClient");
const port = process.env.PORT || 8000;
const appName = process.env.APP_NAME || 'App';
let server;
async function start() {
    try {
        // Connect Redis BEFORE app.ts (and therefore rateLimiters.ts / RedisStore) is ever loaded
        if (!redisClient_1.redisClient.isOpen) {
            await redisClient_1.redisClient.connect();
        }
        console.log('Connected to Redis successfully');
        // Dynamic import ensures app.ts's module graph (which imports rateLimiters.ts)
        // only evaluates AFTER the redis client is connected.
        const { default: app } = await Promise.resolve().then(() => __importStar(require('./app')));
        (0, mail_1.verifySmtpConnection)();
        server = app.listen(port, () => {
            console.log(`${appName} is listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
    // log it, don't crash — let the specific request fail instead
});
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    // same idea — log and continue rather than let Node kill the process
});
async function shutdown(signal) {
    console.log(`Received ${signal}. Shutting down gracefully...`);
    if (server) {
        server.close(() => console.log('HTTP server closed'));
    }
    if (redisClient_1.redisClient.isOpen) {
        await redisClient_1.redisClient.disconnect();
        console.log('Redis client disconnected');
    }
    process.exit(0);
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
start();
//# sourceMappingURL=server.js.map