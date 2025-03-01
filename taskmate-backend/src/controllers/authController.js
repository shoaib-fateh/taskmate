import { auth, db } from "../firebase.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Register User
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required!" });

    try {
      await auth.getUserByEmail(email);
      return res.status(400).json({ message: "Email is already in use!" });
    } catch (err) {}

    const user = await auth.createUser({ email, password });

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const token = jwt.sign({ uid: user.uid, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, uid: user.uid, email });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required!" });

    let userRecord;
    try {
      userRecord = await auth.getUserByEmail(email);
    } catch (err) {
      return res.status(400).json({ message: "User not found!" });
    }

    const userDoc = await db.collection("users").doc(userRecord.uid).get();
    if (!userDoc.exists) {
      console.error(
        `Firestore Error: User ${userRecord.uid} not found in Firestore`
      );
      return res.status(400).json({ message: "User data not found!" });
    }

    const userData = userDoc.data();

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password!" });
    }

    const token = jwt.sign(
      { uid: userRecord.uid, email: userRecord.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, uid: userRecord.uid, email: userRecord.email });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Something went wrong!" });
  }
};
