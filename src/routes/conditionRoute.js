import express from "express";
import * as conditionController from "../controllers/conditionController.js";

const router = express.Router();

// Route to get all Conditions
router.get("/", conditionController.getConditions);

// Route to get a Condition by ID
router.get("/:id", conditionController.getConditionById);

// Route to create a new Condition
router.post("/", conditionController.createCondition);

router.post("/ids", conditionController.getExerciseListByIDs);

// Route to update a Condition
router.put("/:id", conditionController.updateCondition);

// Route to delete a Condition
router.delete("/:id", conditionController.deleteCondition);

router.post("/getid", conditionController.getIDOnly);

router.post("/getexercises", conditionController.getExercises);

router.get(
  "/area/:areaId/acondition/:aconditionId",
  conditionController.getTreatmentlistOnly
);

export default router;
