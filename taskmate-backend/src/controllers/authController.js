import admin from "firebase-admin";
import { auth, db } from "../firebase.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";

const createUserObject = (
  uid,
  email,
  username,
  profileImage,
  password = null
) => ({
  uid,
  email,
  username,
  profileImage,
  password: password ? bcrypt.hashSync(password, 10) : null,
  createdAt: new Date(),
});

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
    const username = email.split("@")[0];
    const userObject = createUserObject(
      user.uid,
      email,
      username,
      "",
      password
    );

    await db.collection("users").doc(user.uid).set(userObject);

    const token = jwt.sign(
      { uid: user.uid, email, username },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token, uid: user.uid, email, username });
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
      { uid: userRecord.uid, email: userRecord.email, username: userData.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, uid: userRecord.uid, email: userRecord.email, username: userData.username });
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
    const { uid, email, name, picture } = decodedToken;

    if (!email)
      return res.status(400).json({ message: "Google email is required" });

    let user;
    try {
      user = await auth.getUserByEmail(email);
    } catch (err) {
      user = await auth.createUser({ uid, email, displayName: name });
    }

    const username = name.replace(/\s+/g, "").toLowerCase();
    const userObject = createUserObject(user.uid, email, username, picture);

    await db.collection("users").doc(user.uid).set(userObject);

    const token = jwt.sign(
      { uid, email, username, profileImage: picture },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({ token, ...userObject });
  } catch (error) {
    console.error("Google Signup Error:", error);
    res.status(500).json({ message: "Google signup failed!" });
  }
};

// GitHub SignUp
export const githubSignup = async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken)
      return res.status(400).json({ message: "GitHub access token is required" });

    const githubUser = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const { id, login, email, avatar_url } = githubUser.data;

    const userEmail = email || `${login}@github.com`;

    let user;
    try {
      user = await auth.getUserByEmail(userEmail);
    } catch (err) {
      user = await auth.createUser({ email: userEmail, displayName: login });
    }

    const username = login.toLowerCase();
    const userObject = createUserObject(user.uid, userEmail, username, avatar_url);

    await db.collection("users").doc(user.uid).set(userObject);

    const token = jwt.sign(
      { uid: user.uid, email: userEmail, username, profileImage: avatar_url },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, ...userObject });
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

    const userDoc = await db.collection("users").doc(user.uid).get();
    if (!userDoc.exists) {
      return res.status(400).json({ message: "User data not found!" });
    }

    const userData = userDoc.data();

    const token = jwt.sign({ uid, email, username: userData.username }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, uid, email, username: userData.username });
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

    const userDoc = await db.collection("users").doc(user.uid).get();
    if (!userDoc.exists) {
      return res.status(400).json({ message: "User data not found!" });
    }

    const userData = userDoc.data();

    const token = jwt.sign({ uid: user.uid, email, username: userData.username }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, uid: user.uid, email, username: userData.username });
  } catch (error) {
    console.error("GitHub Login Error:", error);
    res.status(500).json({ message: "GitHub login failed!" });
  }
};
