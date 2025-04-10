import express, { Application } from "express";
import route from "./routes/route";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Application = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_PATH || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

console.log("CORS allowed origin:", process.env.FRONTEND_PATH);

app.use("/api", route);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("open"));
