import express from "express";
import * as videoController from "../controllers/videoController.js";

const router = express.Router();

// Route to get all Videos
router.post("/share", videoController.getVideos);

router.get("/", videoController.getAllVideos);

// Route to get a Video by ID
router.get("/:id", videoController.getVideoById);

// Route to create a new Video
router.post("/", videoController.createVideo);

// Route to update a Video
router.put("/:id", videoController.updateVideo);

// Route to delete a Video
router.delete("/:id", videoController.deleteVideo);

export default router;
