import express from "express";
import * as practiceController from "../controllers/practiceController.js";

const router = express.Router();

router.post("/", practiceController.createPractice); // Create a new practice
router.get("/", practiceController.getAllPractices); // Get all practices
router.get("/withsuspendstatus", practiceController.getAllPracticesWithStatus); // Get all practices
router.get("/:id", practiceController.getPracticeById); // Get a practice by ID
router.put("/:id", practiceController.updatePractice); // Update practice by ID
router.delete("/:id", practiceController.deletePractice); // Delete practice by ID

export default router;
