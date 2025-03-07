import { db } from "../firebase.js";

export const getUser = async (req, res) => {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }
  
      const userRef = db.collection("users").doc(userId);
      const userDoc = await userRef.get();
  
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const userData = userDoc.data();
      res.status(200).json({
        userId,
        name: userData.username || "",
        email: userData.email || "",
        profileImage: userData.profileImage || "",
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  