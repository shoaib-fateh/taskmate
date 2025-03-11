import { saveToIndexedDB, getFromIndexedDB } from "./indexedDB";
import {
  queueRequest,
  getQueuedRequests,
  removeQueuedRequest,
} from "./requestQueue";

const MAX_RETRIES = 3;

/**
 * @param {string} url
 * @param {string} method
 * @param {Object|null} body
 * @param {string} storeName
 */
export const sendRequest = async (url, method = "GET", body = null, storeName) => {
  const requestConfig = {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  };

  if (!navigator.onLine) {
    console.warn(`Offline! Fetching from IndexedDB: ${storeName}`);
    if (storeName) {
      const cachedData = await getFromIndexedDB(storeName);
      return cachedData.length ? cachedData : null;
    }
    return null;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, requestConfig);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();

      if (method === "GET" && storeName) {
        await saveToIndexedDB(storeName, data);
      }

      console.log(`✅ Request successful: ${url}`);
      return data;
    } catch (error) {
      console.error(`❌ Request failed (Attempt ${attempt}/${MAX_RETRIES}):`, error);
      if (attempt === MAX_RETRIES) {
        console.warn("🔄 Queueing request after final failure:", url);
        await queueRequest({ url, method, body, storeName });
      }
    }
  }

  return null;
};

export const processQueuedRequests = async () => {
  if (!navigator.onLine) return;

  const requests = await getQueuedRequests();
  for (const req of requests) {
    try {
      const response = await sendRequest(
        req.url,
        req.method,
        req.body,
        req.storeName
      );
      if (response) await removeQueuedRequest(req.id);
      console.log("✅ Successfully processed queued request:", req.url);
    } catch (error) {
      console.error("❌ Failed to process queued request:", req.url, error);
    }
  }
};

window.addEventListener("online", processQueuedRequests);
