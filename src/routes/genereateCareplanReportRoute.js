import express from "express";
import * as genereateCareplanReportController from "../controllers/generateCareplanReportController.js";

const router = express.Router();

router.post("/", genereateCareplanReportController.generate);

export default router;
