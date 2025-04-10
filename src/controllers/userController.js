import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../services/authService.js";
import { updateStatusService } from "../services/userService.js";

// Create a new user
const createUser = async (req, res) => {
  const {
    username,
    password,
    securitytype,
    patientid,
    practiceid,
    suspended,
    description,
    email,
  } = req.body;

  try {
    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password,
      securitytype,
      patientid,
      practiceid,
      suspended,
      description,
      email,
    });

    const token = generateToken(newUser);

    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "An error occurred while creating the user." });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
};

const getUsersByPracticeID = async (req, res) => {
  const { practiceid } = req.params;
  try {
    const users = await User.findAll({
      where: {
        practiceid,
      },
    });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ error: "No users found for this practice ID." });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching users by practice ID.",
    });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the user." });
  }
};

// Update an existing user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    username,
    password,
    securitytype,
    patientid,
    practiceid,
    suspended,
    description,
    email,
  } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Hash password if provided
    // if (password) {
    //   user.password = await bcrypt.hash(password, 10);
    // }

    user.username = username || user.username;
    user.securitytype = securitytype || user.securitytype;
    user.patientid = patientid || user.patientid;
    user.practiceid = practiceid || user.practiceid;
    user.suspended = suspended !== undefined ? suspended : user.suspended;
    user.password = password || user.password;
    user.description = description || user.description;
    user.email = email || user.email;

    await user.save();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

const updateStatus = async (req, res) => {
  const { practiceid } = req.params;
  try {
    const updatedUsers = await updateStatusService(practiceid);
    res.status(200).json(updatedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

export {
  createUser,
  getUsers,
  getUsersByPracticeID,
  getUserById,
  updateUser,
  deleteUser,
  updateStatus,
};
