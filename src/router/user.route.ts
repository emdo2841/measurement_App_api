import express from "express";
import {createUser, deleteUser, getUser, profile, updateUser} from "../controller/user";
import { changePassword } from "../controller/auth";
import multer from "multer";
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit
import { authenticateToken } from '../middleWare/authMiddleware';


const router = express.Router();
// Registration must remain public. Every route declared after router.use is protected.
router.post("/", upload.single("image"), createUser);

router.use(authenticateToken);
router.get("/profile", profile)
router.post("/change-password", changePassword)
router.get("/:id",  getUser);
router.patch("/:id", upload.single('image'),  updateUser);
router.delete("/:id",  deleteUser);

export {router as userRouter};
