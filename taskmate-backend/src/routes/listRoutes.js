import express from "express";
import { createList, getLists, updateListOrder } from "../controllers/listController.js";

const router = express.Router();

router.get("/get-lists/:boardId", getLists);
router.post("/create-list", createList);
router.post("/update-order", updateListOrder);

export default router;
