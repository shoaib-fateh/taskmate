import express from "express";
import { createBoard } from "../controllers/boardController.js";

const router = express.Router();

router.post("/create-board", createBoard);

export default router;
