import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
