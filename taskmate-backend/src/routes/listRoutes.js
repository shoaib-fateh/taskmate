import express from "express";
import { createList, getLists } from "../controllers/listController.js";

const router = express.Router();

router.get("/get-lists/:boardId", getLists);
router.post("/create-list", createList);

export default router;
