import express from "express";
import {
  login,
  register,
  googleLogin,
  githubLogin,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google-login", googleLogin);
router.post("/github-login", githubLogin);
router.post("/google-signup", googleSignup);
router.post("/github-signup", githubSignup);

export default router;
