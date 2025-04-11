import express from "express";
import * as ebprotexerciseController from "../controllers/ebprotexerciseController.js";

const router = express.Router();

// Route to get all EBProtExercises
router.get("/", ebprotexerciseController.getEBProtExercises);

// Route to get an EBProtExercise by ID
router.get("/:id", ebprotexerciseController.getEBProtExerciseById);

router.get(
  "/protocolid/:protocolid",
  ebprotexerciseController.getEBProtExercisesByProtId
);

// Route to create a new EBProtExercise
router.post("/", ebprotexerciseController.createEBProtExercise);

router.post("/bulkcreate", ebprotexerciseController.bulkCreate);

router.post("/bulkedit", ebprotexerciseController.bulkEdit);

router.post("/bulkdelete", ebprotexerciseController.bulkDelete);

// Route to update an EBProtExercise
router.put("/:id", ebprotexerciseController.updateEBProtExercise);

// Route to delete an EBProtExercise
router.delete("/:id", ebprotexerciseController.deleteEBProtExercise);

export default router;
