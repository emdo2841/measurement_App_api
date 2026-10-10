"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = requireAdmin;
const db_1 = require("../db");
async function requireAdmin(req, res, next) {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({
                error: 'Authentication required.',
            });
        }
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
            select: {
                platformRole: true,
                accountStatus: true,
            },
        });
        if (!user ||
            user.platformRole !== 'ADMIN' ||
            user.accountStatus !== 'ACTIVE') {
            return res.status(403).json({
                error: 'Administrator access required.',
            });
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
//# sourceMappingURL=admin.js.map