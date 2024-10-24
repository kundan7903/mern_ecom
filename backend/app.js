import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";
import ReservationRouter from "./routes/reservation_route.js";
const app = express();
dotenv.config({ path: "./config/config.env" });
dbConnection();
// const corsOptions = {
//   origin: ["*"], // Allows all origins
//   methods: "POST",
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: "*", // Allows all headers
//   credentials: false,
// };
// const cors = require("cors");
const corsOptions = {
  origin: "http://127.0.0.1:5173",
  credentials: true, // Allow credentials (cookies, authentication)
};

app.use(cors(corsOptions));
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/reservation", ReservationRouter);
// app.get("/", (req, res, next) => {
//   return res.status(200).json({
//     success: true,
//     message: "HELLO WORLD AGAIN",
//   });
// });
app.get("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", ["*"]);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
});
app.use(errorMiddleware);
export default app;
