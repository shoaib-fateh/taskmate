import express from "express";
import { createBoard, getBoards } from "../controllers/boardController.js";

const router = express.Router();

router.post("/create-board", createBoard);
router.get("/get-boards", getBoards);

export default router;
