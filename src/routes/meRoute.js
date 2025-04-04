import express from "express";
import * as meController from "../controllers/meController.js";

const router = express.Router();

router.get("/", meController.getMe);

export default router;
