import express from "express";
import cors from "cors";
import sessionMiddleware from "./middlewares/session";
import authRoutes from "./routes/authRoutes";
import todoRoutes from "./routes/todoRoutes";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(sessionMiddleware);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes); // Add todo routes

export default app;
