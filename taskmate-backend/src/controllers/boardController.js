import { db } from "../firebase.js";

const generateBoardId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let boardId = "";
  for (let i = 0; i < 3; i++) {
    boardId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return boardId;
};

export const createBoard = async (req, res) => {
  try {
    const { userId, boardTitle, type } = req.body;

    if (!userId || !boardTitle || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const boardId = generateBoardId();
    const formattedTitle = boardTitle.replaceAll(" ", "-").toLowerCase();
    const boardUrl = `/b/${userId.slice(0, 6)}/${boardId}/${formattedTitle}`;

    const newBoard = {
      userId,
      boardTitle,
      type,
      boardId,
      lists: [],
      createdAt: new Date().toISOString(),
      boardUrl,
    };

    await db.collection("boards").doc(boardId).set(newBoard);

    res.status(201).json({ message: "Board created successfully", boardUrl });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
