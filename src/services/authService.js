import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign({ userId: user.userid }, process.env.JWT_SECRET, {
    expiresIn: "24h", // Token expires in 1 hour
  });
};
