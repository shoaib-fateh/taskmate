import { auth } from "../firebase.js";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await auth.createUser({ email, password });
    res.json({ uid: user.uid, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRecord = await auth.getUserByEmail(email);

    const token = jwt.sign({ uid: userRecord.uid }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
