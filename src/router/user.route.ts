import express from "express";
import {createUser, deleteUser, getUser, profile, updateUser} from "../controller/user";
import { authenticateToken } from "../middleWare/authMiddleware";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit


const router = express.Router();
router.get("/profile", authenticateToken, profile)

router.post("/", upload.single("image"), createUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export {router as userRouter};