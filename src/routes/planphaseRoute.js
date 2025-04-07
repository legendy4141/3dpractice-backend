import express from "express";
import * as planphaseController from "../controllers/planphaseController.js";

const router = express.Router();

router.get("/", planphaseController.getAllPlanPhases);
router.get("/:id", planphaseController.getPlanPhaseById);
router.post("/", planphaseController.createPlanPhase);
router.post("/bulkedit", planphaseController.bulkEdit);
router.post(
  "/practiceid/:practiceid/careplanid/:careplanid",
  planphaseController.getPhases
);
router.put("/:id", planphaseController.updatePlanPhase);
router.delete("/:id", planphaseController.deletePlanPhase);
router.delete(
  "/practiceid/:practiceid/careplanid/:careplanid",
  planphaseController.deletePlanPhaseByPracIDnCareplanID
);

export default router;
