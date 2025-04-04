import express from "express";
import * as generateExerciseReportController from "../controllers/generateExerciseReportController.js";

const router = express.Router();

router.post("/", generateExerciseReportController.generate);

export default router;
