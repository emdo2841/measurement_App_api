"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaMock = void 0;
const vitest_1 = require("vitest"); // 1. Added 'vi' import
const vitest_mock_extended_1 = require("vitest-mock-extended");
const db_1 = require("../db");
// 2. Changed 'vitest.mock' to 'vi.mock'
vitest_1.vi.mock('../db', () => ({
    __esModule: true,
    prisma: (0, vitest_mock_extended_1.mockDeep)(),
}));
// 3. Added <PrismaClient> generic type argument
exports.prismaMock = db_1.prisma;
(0, vitest_1.beforeEach)(() => {
    (0, vitest_mock_extended_1.mockReset)(exports.prismaMock);
});
//# sourceMappingURL=db.js.map