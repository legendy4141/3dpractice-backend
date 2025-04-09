import express from "express";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/user/login", authController.userSignIn);
router.post("/user/reset_pass", authController.userResetPass);
router.post("/user/forgot_pass", authController.userForgotPass);

router.post("/admin/login", authController.adminSignIn);
router.post("/admin/reset_pass", authController.adminResetPass);
router.post("/admin/forgot_pass", authController.adminForgotPass);
export default router;
