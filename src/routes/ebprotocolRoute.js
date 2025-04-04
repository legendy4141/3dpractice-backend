import express from "express";
import * as ebprotocolController from "../controllers/ebprotocolController.js";

const router = express.Router();

// Route to get all EBProtocols
router.get("/", ebprotocolController.getEBProtocols);

// Route to get EBProtocol by ID
router.get("/:id", ebprotocolController.getEBProtocolById);

// Route to create a new EBProtocol
router.post("/", ebprotocolController.createEBProtocol);

// Route to update an EBProtocol
router.put("/:id", ebprotocolController.updateEBProtocol);

// Route to delete an EBProtocol
router.delete("/:id", ebprotocolController.deleteEBProtocol);

export default router;
