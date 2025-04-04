import express from "express";
import * as phaseController from "../controllers/phaseController.js";

const router = express.Router();

// Route to get all Phases
router.get("/", phaseController.getPhases);

router.get(
  "/securitytype/:securitytypeId/practiceid/:practiceId",
  phaseController.getPhasesWithSecurityType
);

// Route to get a Phase by ID
router.get("/:id", phaseController.getPhaseById);

// Route to create a new Phase
router.post("/", phaseController.createPhase);

// Route to update a Phase
router.put("/:id", phaseController.updatePhase);

// Route to delete a Phase
router.delete("/:id", phaseController.deletePhase);

export default router;
