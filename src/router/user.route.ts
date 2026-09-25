import express from "express";
import {createUser, deleteUser, getUser, profile, updateUser} from "../controller/user";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
import { authenticateToken } from '../middleWare/authMiddleware';


const router = express.Router();
router.get("/profile", authenticateToken, profile)
// router.get("/", authenticateToken, getAllUsers);

router.post("/", upload.single("image"), createUser);
router.get("/:id", authenticateToken,  getUser);
router.patch("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export {router as userRouter};