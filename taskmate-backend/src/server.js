import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use("/api/users", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));
