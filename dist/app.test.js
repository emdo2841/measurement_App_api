"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("./app"));
const db_1 = require("./__mocks__/db");
// Mock SMTP verification
vitest_1.vi.mock('./Utils/mail', () => ({
    verifySmtpConnection: vitest_1.vi.fn(),
}));
(0, vitest_1.describe)('GET /', () => {
    (0, vitest_1.it)('should return 200 with list of users from Prisma', async () => {
        const mockUsers = [
            {
                id: '1',
                name: 'Joy Zabura',
                email: 'john@example.com',
                password: 'hashedpassword',
                phone: null,
                image: null,
                imagePublicId: null,
                resetTokens: null,
                resetTokenExpiry: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        // Mock Prisma return value
        db_1.prismaMock.user.findMany.mockResolvedValue(mockUsers);
        const response = await (0, supertest_1.default)(app_1.default).get('/');
        (0, vitest_1.expect)(response.status).toBe(200);
        (0, vitest_1.expect)(response.body.status).toBe('success');
        (0, vitest_1.expect)(response.body.data.users).toHaveLength(1);
        (0, vitest_1.expect)(response.body.data.users[0].name).toBe('Joy Zabura');
    });
});
(0, vitest_1.describe)('Middleware & Error Handlers', () => {
    (0, vitest_1.it)('should return 404 for unknown endpoints', async () => {
        const response = await (0, supertest_1.default)(app_1.default).get('/api/v1/unknown-route');
        (0, vitest_1.expect)(response.status).toBe(404);
        (0, vitest_1.expect)(response.body).toEqual({ error: "Sorry, can't find that!" });
    });
    (0, vitest_1.it)('should return 400 for malformed JSON bodies', async () => {
        const response = await (0, supertest_1.default)(app_1.default)
            .post('/api/v1/auth/login')
            .set('Content-Type', 'application/json')
            .send('{"invalid_json": ');
        (0, vitest_1.expect)(response.status).toBe(400);
        (0, vitest_1.expect)(response.body).toEqual({ error: 'Invalid JSON in request body' });
    });
});
//# sourceMappingURL=app.test.js.map