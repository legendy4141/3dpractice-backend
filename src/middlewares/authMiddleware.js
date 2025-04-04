import jwt from "jsonwebtoken";
import { getUserById } from "../services/userService.js";

export const authMiddleware = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: No token provided." });
  }

  const tokenWithoutBearer = token.replace("Bearer ", "");

  // Verify the JWT token
  try {
    const { userId } = await jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_SECRET
    );
    req.user = await getUserById(userId); // Store decoded info in req.user

    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
