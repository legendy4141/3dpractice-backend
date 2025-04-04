import express from "express";
import * as careplanController from "../controllers/careplanController.js";

const router = express.Router();

router.get("/", careplanController.getCareplans);

router.get("/:id", careplanController.getCareplanById);

router.get(
  "/practiceid/:practiceid",
  careplanController.getCareplanByPracticeId
);

router.post("/", careplanController.createCareplan);

router.put("/:id", careplanController.updateCareplan);

router.delete("/:id", careplanController.deleteCareplan);

export default router;
