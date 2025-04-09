import { generateToken } from "../services/authService.js";
import { getUserByUsername } from "../services/userService.js";
import { getAdminUserByUsername } from "../services/userService.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userSignIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByUsername(username);
  if (user) {
    const compRes = await user.comparePassword(password);
    if (compRes) {
      if (user.suspended === 0) {
        const token = generateToken(user);
        res.status(200).json({ accessToken: token });
      } else
        res.status(401).json({
          message: "Your account has been suspended.",
        });
    } else {
      res.status(401).json({ message: "Invalid credential." });
    }
  } else {
    res.status(401).json({ message: "Invalid credential." });
  }
};

export const userResetPass = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  const user = await getUserByUsername(username);
  if (user) {
    const compRes = await user.comparePassword(currentPassword);
    if (compRes) {
      if (user.suspended === 0) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Success" });
      } else
        res.status(401).json({
          message: "Your account has been suspended.",
        });
    } else {
      res.status(401).json({ message: "Invalid credential." });
    }
  } else {
    res.status(401).json({ message: "Invalid credential." });
  }
};

export const userForgotPass = async (req, res) => {
  const { username, email } = req.body;
  const newPassword = "123456";

  const user = await getUserByUsername(username);
  if (user) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Success" });
  } else {
    res.status(401).json({ message: "Invalid credential." });
  }
};

export const adminSignIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await getAdminUserByUsername(username);
  if (user) {
    const compRes = await user.comparePassword(password);
    if (compRes) {
      if (user.suspended === 0) {
        const token = generateToken(user);
        res.status(200).json({ accessToken: token });
      } else
        res.status(401).json({
          message: "Your account has been suspended.",
        });
    } else {
      res.status(401).json({ message: "Invalid credential." });
    }
  } else {
    res.status(401).json({ message: "Invalid credential." });
  }
};

export const adminResetPass = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  const user = await getAdminUserByUsername(username);
  if (user) {
    const compRes = await user.comparePassword(currentPassword);
    if (compRes) {
      if (user.suspended === 0) {
        user.password = newPassword;
        await user.save();
        res.status(200).json({ message: "Success" });
      } else
        res.status(401).json({
          message: "Your account has been suspended.",
        });
    } else {
      res.status(401).json({ message: "Invalid credential." });
    }
  } else {
    res.status(401).json({ message: "Invalid credential." });
  }
};

export const adminForgotPass = async (req, res) => {
  const { username, email } = req.body;
  const newPassword = "123456";

  const user = await getAdminUserByUsername(username);
  if (user) {
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Success" });
  } else {
    res.status(401).json({ message: "Invalid credential." });
  }
};
