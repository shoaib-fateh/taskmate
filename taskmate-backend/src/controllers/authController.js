import admin from "firebase-admin";
import { auth, db } from "../firebase.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

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
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// Google SignUp
export const googleSignup = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken)
      return res.status(400).json({ message: "No Google ID token provided" });

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = decodedToken;

    if (!email)
      return res.status(400).json({ message: "Google email is required" });

    let user;
    try {
      user = await auth.getUserByEmail(email);
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    } catch (err) {
      user = await auth.createUser({ uid, email, displayName: name });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Google Signup Error:", error);
    res.status(500).json({ message: "Google signup failed!" });
  }
};

// GitHub SignUp
export const githubSignup = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const githubUser = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id, login, email } = githubUser.data;

    if (!email)
      return res.status(400).json({ message: "GitHub email is required" });

    let user;
    try {
      user = await auth.getUserByEmail(email);
      return res
        .status(400)
        .json({ message: "User already exists. Please log in." });
    } catch (err) {
      user = await auth.createUser({ email, displayName: login });
    }

    // Generate JWT
    const token = jwt.sign({ uid: user.uid, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, uid: user.uid, email });
  } catch (error) {
    console.error("GitHub Signup Error:", error);
    res.status(500).json({ message: "GitHub signup failed!" });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken)
      return res.status(400).json({ message: "No Google ID token provided" });

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    if (!email)
      return res.status(400).json({ message: "Google email is required" });

    let user;
    try {
      user = await auth.getUserByEmail(email);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up first." });
    }

    // ✅ Generate JWT
    const token = jwt.sign({ uid, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({ message: "Google login failed!" });
  }
};

// GitHub Login
export const githubLogin = async (req, res) => {
  try {
    const { accessToken } = req.body;

    const githubUser = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { email } = githubUser.data;

    if (!email)
      return res.status(400).json({ message: "GitHub email not available!" });

    let user;
    try {
      user = await auth.getUserByEmail(email);
    } catch (err) {
      return res
        .status(400)
        .json({ message: "User not found. Please sign up first." });
    }

    // Generate JWT
    const token = jwt.sign({ uid: user.uid, email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, uid: user.uid, email });
  } catch (error) {
    console.error("GitHub Login Error:", error);
    res.status(500).json({ message: "GitHub login failed!" });
  }
};
