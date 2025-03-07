import express from "express";
import { createBoard, getBoards, getBoardMembers } from "../controllers/boardController.js";

const router = express.Router();

router.post("/create-board", createBoard);
router.get("/get-boards", getBoards);
router.get("/get-board-members/:boardId", getBoardMembers);

export default router;
