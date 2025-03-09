import { openDB } from "idb";

const DB_NAME = "taskmate-db";
const STORE_NAME = "request-queue";

// Initialize IndexedDB
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
    }
  },
});

// Add request to queue
export const queueRequest = async (request) => {
  const db = await dbPromise;
  await db.add(STORE_NAME, request);
};

// Get all queued requests
export const getQueuedRequests = async () => {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
};

// Remove request after successful retry
export const removeQueuedRequest = async (id) => {
  const db = await dbPromise;
  await db.delete(STORE_NAME, id);
};
