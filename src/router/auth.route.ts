import express from "express";
import { login, logout, refreshToken, resetPassword, forgotPassword, googleLogin } from "../controller/auth";

const router = express.Router();

router.post("/login", login);
router.post("/google", googleLogin);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


export {router as authRouter};