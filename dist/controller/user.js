"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.deleteUser = exports.updateUser = exports.getUser = exports.createUser = void 0;
const db_1 = require("../db");
const user_schema_1 = require("../schemas/user.schema");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const cloudinary_1 = require("../Utils/cloudinary");
const email_1 = require("../services/email");
const emailTemplate_1 = require("../template/emailTemplate");
const cache_1 = require("../middleWare/cache");
const userCacheKey = (id) => `user:${id}`;
const profileCacheKey = (id) => `user:profile:${id}`;
const createUser = async (req, res) => {
    try {
        const file = req.file;
        const validatedData = user_schema_1.createUserSchema.safeParse(req.body);
        if (!validatedData.success) {
            return res.status(400).json({ error: validatedData.error.format() });
        }
        const { email, name, password, phone } = validatedData.data;
        let imageUrl;
        let imagePublicId;
        if (file) {
            const { url, publicId } = await (0, cloudinary_1.uploadImageBuffer)(file.buffer, 'users');
            imageUrl = url;
            imagePublicId = publicId;
        }
        const existingUser = await db_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await db_1.prisma.user.create({
            data: {
                email,
                name,
                image: imageUrl,
                imagePublicId,
                password: hashedPassword,
                phone
            }
        });
        const htmlContent = (0, emailTemplate_1.signupTemplate)(user.name);
        try {
            await (0, email_1.sendEmail)({
                to: email,
                subject: "Welcome to EJ Services. ",
                html: htmlContent
            });
        }
        catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
        }
        return res.status(201).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.createUser = createUser;
const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const cacheKey = userCacheKey(userId);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        // 2. Cache miss -> query DB
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // 3. Populate cache (fire-and-forget, non-blocking on errors)
        await (0, cache_1.setCache)(cacheKey, user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.getUser = getUser;
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const validatData = user_schema_1.UpdateUserSchema.safeParse(req.body);
        if (!validatData.success) {
            return res.status(400).json({ error: validatData.error.format() });
        }
        const user = await db_1.prisma.user.update({
            where: { id },
            data: validatData.data
        });
        // Invalidate stale cache entries for this user
        await (0, cache_1.delCache)(userCacheKey(id), profileCacheKey(id));
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        // 1. Query the user along with nested client and order imagePublicIds
        const user = await db_1.prisma.user.findUnique({
            where: { id },
            select: {
                imagePublicId: true,
                clients: {
                    select: {
                        imagePublicId: true,
                        orders: {
                            select: {
                                imagePublicId: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // 2. Collect all non-null publicIds into a single array
        const publicIds = [];
        if (user.imagePublicId)
            publicIds.push(user.imagePublicId);
        for (const client of user.clients) {
            if (client.imagePublicId)
                publicIds.push(client.imagePublicId);
            for (const order of client.orders) {
                if (order.imagePublicId)
                    publicIds.push(order.imagePublicId);
            }
        }
        // 3. Delete all collected images in parallel
        if (publicIds.length > 0) {
            await Promise.allSettled(publicIds.map((publicId) => (0, cloudinary_1.deleteImage)(publicId)));
        }
        // 4. Delete user from database
        await db_1.prisma.user.delete({
            where: { id },
        });
        // 5. Invalidate cache entries for this user
        await (0, cache_1.delCache)(userCacheKey(id), profileCacheKey(id));
        return res.status(200).json({ message: "User and associated images deleted successfully" });
    }
    catch (error) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: "User not found" });
        }
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.deleteUser = deleteUser;
const profile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: "unathorized access" });
        }
        const cacheKey = profileCacheKey(userId);
        // 1. Try cache first
        const cached = await (0, cache_1.getCache)(cacheKey);
        if (cached) {
            return res.status(200).json(cached);
        }
        // 2. Cache miss -> query DB
        const user = await db_1.prisma.$primary().user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                image: true,
                createdAt: true
            }
        });
        if (!user) {
            return res.status(404).json({ error: "user not found" });
        }
        // 3. Populate cache
        await (0, cache_1.setCache)(cacheKey, user);
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
exports.profile = profile;
//# sourceMappingURL=user.js.map