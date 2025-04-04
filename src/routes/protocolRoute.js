import express from "express";
import * as protocolController from "../controllers/protocolController.js";

const router = express.Router();

// Route to get all protocols
router.get("/", protocolController.getProtocols);

// Route to get a protocol by ID
router.get("/:id", protocolController.getProtocolById);

// Route to create a new protocol
router.post("/", protocolController.createProtocol);

// Route to update a protocol
router.put("/:id", protocolController.updateProtocol);

// Route to delete a protocol
router.delete("/:id", protocolController.deleteProtocol);

router.post("/getwithIdNcondition", protocolController.getWithIDnCondition);

export default router;
