import express from "express";
import dotenv from "dotenv";
import route from "./routes/index.js";
import CONFIG from "./config/config.js";
import log from "./utils/logger.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", route);
app.use(express.static("public"));

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(CONFIG.PORT, () => {
  log.info(`Server running on port ${CONFIG.PORT}`);
});
