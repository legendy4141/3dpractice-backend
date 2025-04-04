import express from "express";
import * as protExerciseController from "../controllers/protExerciseController.js";

const router = express.Router();

// Route to get all ProtExercises
router.get("/", protExerciseController.getProtExercises);

// Route to get a ProtExercise by ID
router.get("/:id", protExerciseController.getProtExerciseById);

router.post("/getByPracIDnProtID", protExerciseController.getByPracIDnProtID);

// Route to create a new ProtExercise
router.post("/", protExerciseController.createProtExercise);

// Route to bulk create ProtExercises
router.post("/bulk-create", protExerciseController.bulkCreateProtExercises);

router.post("/bulk-edit", protExerciseController.bulkEditProtExercises);

router.post(
  "/deleteByPracIDnProtID",
  protExerciseController.deleteByPracIDnProtID
);

// Route to update a ProtExercise
router.put("/:id", protExerciseController.updateProtExercise);

router.post("/copy", protExerciseController.copyProtExercise);

// Route to delete a ProtExercise
router.delete("/:id", protExerciseController.deleteProtExercise);

export default router;
