import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", authController.signIn);
router.post("/reset_pass", authController.resetPass);
router.post("/forgot_pass", authController.forgotPass);

export default router;
