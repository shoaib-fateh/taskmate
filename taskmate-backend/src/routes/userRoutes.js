import express from "express";
import { getUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/get-user/:userId", getUser);

export default router;
