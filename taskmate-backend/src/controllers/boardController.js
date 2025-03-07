import { db } from "../firebase.js";

const generateBoardId = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let boardId = "";
  for (let i = 0; i < 5; i++) {
    boardId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return boardId;
};

export const createBoard = async (req, res) => {
  try {
    const { userId, boardTitle, visibility, coverImage = "" } = req.body;

    if (!userId || !boardTitle || !visibility) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const boardId = generateBoardId();
    const formattedTitle = boardTitle.replaceAll(" ", "-").toLowerCase();
    const boardUrl = `/b/${userId.slice(0, 6)}/${boardId}/${formattedTitle}`;

    const newBoard = {
      userId,
      boardTitle,
      visibility,
      boardId,
      lists: [],
      members: [{ userId, role: "admin" }],
      coverImage,
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



export const getBoards = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const snapshot = await db.collection("boards").where("userId", "==", userId).get();

    const boards = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(boards);
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getBoardMembers = async (req, res) => {
  try {
    const { boardId } = req.params;
    if (!boardId) {
      return res.status(400).json({ error: "Board ID is required" });
    }

    const boardRef = db.collection("boards").doc(boardId);
    const boardDoc = await boardRef.get();

    if (!boardDoc.exists) {
      return res.status(404).json({ error: "Board not found" });
    }

    const boardData = boardDoc.data();
    res.status(200).json({ members: boardData.members || [] });
  } catch (error) {
    console.error("Error fetching board members:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
