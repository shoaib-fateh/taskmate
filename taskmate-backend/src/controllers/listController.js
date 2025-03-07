import { db } from "../firebase.js";

export const getLists = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ error: "Board ID is required" });
    }

    const listsSnapshot = await db
      .collection("lists")
      .where("boardId", "==", boardId)
      .get();
    const lists = listsSnapshot.docs.map((doc) => doc.data());

    res.status(200).json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createList = async (req, res) => {
  try {
    const { boardId, title } = req.body;

    if (!boardId || !title.trim()) {
      return res.status(400).json({ error: "Board ID and title are required" });
    }

    const listId = `list_${Date.now()}`;

    const listsSnapshot = await db
      .collection("lists")
      .where("boardId", "==", boardId)
      .get();
    const order = listsSnapshot.size;

    const newList = {
      listId,
      boardId,
      title,
      order,
      createdAt: new Date().toISOString(),
    };

    await db.collection("lists").doc(listId).set(newList);

    res.status(201).json({ message: "List created successfully", newList });
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateListOrder = async (req, res) => {
  try {
    const { boardId, lists } = req.body;

    if (!boardId || !lists || !Array.isArray(lists)) {
      return res.status(400).json({ error: "Invalid data provided" });
    }

    const batch = db.batch();
    lists.forEach((list, index) => {
      const listRef = db.collection("lists").doc(list.listId);
      batch.update(listRef, { order: index });
    });

    await batch.commit();
    res.status(200).json({ message: "List order updated successfully" });
  } catch (error) {
    console.error("Error updating list order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
