// routes/userRoute.js
import express from "express";
import * as userController from "../controllers/userController.js"; // Import your user controller

const router = express.Router();

// Define the route for fetching users
router.get("/", userController.getUsers); // Get all users
router.get("/:id", userController.getUserById); // Get a single user by ID
router.get("/practiceid/:practiceid", userController.getUsersByPracticeID); // Get a single user by ID
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
