import { db } from "../firebase.js";

// Fetch tasks
export const getTasks = async (req, res) => {
  try {
    const snapshot = await db.collection("tasks").get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const taskRef = await db.collection("tasks").add({ title, description });
    res.json({ id: taskRef.id, title, description });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
