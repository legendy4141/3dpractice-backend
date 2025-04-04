import express from "express";
import * as treatmentController from "../controllers/treatmentController.js";

const router = express.Router();

// Route to get all Phases
router.get("/", treatmentController.getAllTreatments);
router.get(
  "/securitytype/:securitytypeId/practiceid/:practiceId",
  treatmentController.getTreatmentsWithSecurityType
);
router.get("/:id", treatmentController.getTreatmentById);
router.post("/", treatmentController.createTreatment);
router.put("/:id", treatmentController.updateTreatment);
router.delete("/:id", treatmentController.deleteTreatment);

export default router;
