"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pino_http_1 = __importDefault(require("pino-http"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
require("dotenv/config");
const rateLimiters_1 = require("./middleWare/rateLimiters");
const user_route_1 = require("./router/user.route");
const client_route_1 = require("./router/client.route");
const order_route_1 = require("./router/order.route");
const auth_route_1 = require("./router/auth.route");
const measurement_route_1 = require("./router/measurement.route");
const app = (0, express_1.default)();
app.set('trust proxy', 1);
if (process.env.NODE_ENV !== 'test') {
    app.use((0, pino_http_1.default)());
}
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'http://localhost:8081'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.disable('x-powered-by');
// Routes protected by limiters
app.use("/api/v1/users", rateLimiters_1.publicLimiter, user_route_1.userRouter);
app.use("/api/v1/clients", rateLimiters_1.publicLimiter, client_route_1.clientRouter);
app.use("/api/v1/orders", rateLimiters_1.publicLimiter, order_route_1.orderRouter);
app.use("/api/v1/measurement", rateLimiters_1.publicLimiter, measurement_route_1.measurementtRouter);
app.use("/api/v1/auth", rateLimiters_1.authLimiter, auth_route_1.authRouter);
app.get("/", (req, res) => {
    res.status(200).json({
        message: `Welcome to ${process.env.APP_NAME || 'App'}`,
        status: "successful",
    });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ error: "Sorry, can't find that!" });
});
// Central Error Handler
app.use((err, req, res, next) => {
    if (err.type === 'entity.parse.failed' || err instanceof SyntaxError) {
        return res.status(400).json({ error: 'Invalid JSON in request body' });
    }
    return res.status(500).json({ error: 'Internal server error' });
});
exports.default = app;
//# sourceMappingURL=app.js.map