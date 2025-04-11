import express from "express";
import * as exerciseController from "../controllers/exerciseController.js";

const router = express.Router();

// Get all exercises
router.get("/", exerciseController.getAllExercises);

router.get("/allBMname", exerciseController.getAllBMname);

// Get exercise by ID
router.get("/:id", exerciseController.getExerciseById);

// Create a new exercise
router.post("/", exerciseController.createExercise);

router.post("/ids", exerciseController.getExercisesByIDs);

// Update an exercise
router.put("/:id", exerciseController.updateExercise);

// Delete an exercise
router.delete("/:id", exerciseController.deleteExercise);

router.post("/getexercises", exerciseController.getExercises);

export default router;
