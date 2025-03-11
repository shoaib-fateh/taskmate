import { openDB } from "idb";

const DB_NAME = "taskmate-db";
const STORE_NAME = "request-queue";

const generateId = () => {
  const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
  let boardId = "";
  for (let i = 0; i < 5; i++) {
    boardId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return boardId;
};

const dbPromise = openDB(DB_NAME, 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

export const queueRequest = async (request) => {
  if (!request.id) request.id = generateId()
  const db = await dbPromise;
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);
  await store.add(request);
  return tx.done;
};


export const getQueuedRequests = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

export const removeQueuedRequest = async (id) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};
