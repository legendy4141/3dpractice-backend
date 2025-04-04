import dotenv from "dotenv";

dotenv.config();

export default {
  DB: {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DB_NAME,
    PORT: process.env.DB_PORT, // Updated to DB_PORT
  },
  PORT: process.env.PORT || 4000,
  JWT_SECRET: process.env.JWT_SECRET, // Added for JWT secret
};
