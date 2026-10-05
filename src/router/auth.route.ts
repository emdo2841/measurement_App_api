import express from "express";
import { login, logout, refreshToken, resetPassword, forgotPassword, googleLogin, requestRegistrationOtp, verifyRegistrationOtp } from "../controller/auth";

const router = express.Router();

router.post("/login", login);
router.post("/google", googleLogin);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/registration/request-code", requestRegistrationOtp);
router.post("/registration/verify-code", verifyRegistrationOtp);


export {router as authRouter};