import express from "express";
import * as sendTextController from "../controllers/sendTextController.js";

const router = express.Router();

router.post("/exercise", sendTextController.sendExercise);
router.post("/careplan", sendTextController.sendCareplan);
router.post("/video", sendTextController.sendVideo);

export default router;
