import express from "express";
import * as plantreatmentController from "../controllers/plantreatmentController.js";

const router = express.Router();

router.get("/", plantreatmentController.getAllPlanTreatments); // Get all PlanTreatments
router.get("/:id", plantreatmentController.getPlanTreatmentById); // Get single PlanTreatment by ID
router.get(
  "/practiceid/:practiceid/careplanid/:careplanid",
  plantreatmentController.getTreatments
); // Get single PlanTreatment by ID
router.post("/", plantreatmentController.createPlanTreatment); // Create multiple PlanTreatments
router.post("/bulkedit", plantreatmentController.bulkEdit); // Create multiple PlanTreatments
router.put("/:id", plantreatmentController.updatePlanTreatment); // Update PlanTreatment by ID
router.delete("/:id", plantreatmentController.deletePlanTreatment); // Delete PlanTreatment by ID

export default router;
