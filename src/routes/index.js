import express from "express";

import authMiddleware from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

import authRoute from "./authRoute.js";
import meRoute from "./meRoute.js";
import profileRoute from "./profileRoute.js";
import userRoute from "./userRoute.js";
import exerciseRoute from "./exerciseRoute.js";
import protocolRoute from "./protocolRoute.js";
import ebprotocolRoute from "./ebprotocolRoute.js";
import ebprotexerciseRoute from "./ebprotexerciseRoute.js";
import conditionRoute from "./conditionRoute.js";
import phaseRoute from "./phaseRoute.js";
import practiceRoute from "./practiceRoute.js";
import videoRoute from "./videoRoute.js";
import careplanRoute from "./careplanRoute.js";
import protexerciseRoute from "./protexerciseRoute.js";
import planphaseRoute from "./planphaseRoute.js";
import plantreatmentRoute from "./plantreatmentRoute.js";
import treatmentRoute from "./treatmentRoute.js";
import generateExerciseReportRoute from "./generateExerciseReportRoute.js";
import genereateCareplanReportRoute from "./genereateCareplanReportRoute.js";
import sendEmailRoute from "./sendEmailRoute.js";
import sendTextRoute from "./sendTextRoute.js";
import { getVideoByRandomkey } from "../controllers/videoController.js";
import { getReportByFilename } from "../controllers/reportController.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/me", authMiddleware, meRoute);
router.use("/profile", authMiddleware, profileRoute);
router.use("/users", authMiddleware, roleMiddleware([1, 2]), userRoute);
router.use("/exercise", authMiddleware, exerciseRoute);
router.use("/protocol", authMiddleware, protocolRoute);
router.use("/ebprotocol", authMiddleware, ebprotocolRoute);
router.use("/ebprotexercise", authMiddleware, ebprotexerciseRoute);
router.use("/condition", authMiddleware, conditionRoute);
router.use("/phase", authMiddleware, phaseRoute);
router.use("/practice", authMiddleware, practiceRoute);
router.use("/video", authMiddleware, videoRoute);
router.use("/protexercise", authMiddleware, protexerciseRoute);
router.use("/planphase", authMiddleware, planphaseRoute);
router.use("/plantreatment", authMiddleware, plantreatmentRoute);
router.use("/treatment", authMiddleware, treatmentRoute);
router.use("/careplan", authMiddleware, careplanRoute);
router.use("/shared-video", getVideoByRandomkey);
router.use("/shared-report/:fileName", getReportByFilename);

router.use(
  "/generate-pdf/exercise",
  authMiddleware,
  generateExerciseReportRoute
);

router.use(
  "/generate-pdf/careplan",
  authMiddleware,
  genereateCareplanReportRoute
);

router.use("/send-email", authMiddleware, sendEmailRoute);
router.use("/send-text", authMiddleware, sendTextRoute);

export default router;
