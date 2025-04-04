import express from "express";
import * as profileController from "../controllers/profileController.js";

const router = express.Router();

router.post("/get", profileController.getProfile);
router.post("/edit", profileController.editProfile);

export default router;
