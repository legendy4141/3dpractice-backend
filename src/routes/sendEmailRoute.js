import express from "express";
import * as sendEmailController from "../controllers/sendEmailController.js";

const router = express.Router();

router.post("/exercise", sendEmailController.sendExercise);
router.post("/careplan", sendEmailController.sendCareplan);
router.post("/video", sendEmailController.sendVideo);

export default router;
