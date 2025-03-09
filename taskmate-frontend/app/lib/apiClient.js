import {
  queueRequest,
  getQueuedRequests,
  removeQueuedRequest,
} from "./requestQueue";

const MAX_RETRIES = 3;

export const sendRequest = async (url, method = "GET", body = null) => {
  const requestConfig = {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : null,
  };

  if (!navigator.onLine) {
    console.warn("Offline! Queuing request:", url);
    await queueRequest({ url, method, body });
    return null;
  }

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, requestConfig);
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      console.log(`✅ Request successful: ${url}`);
      return await response.json();
    } catch (error) {
      console.error(
        `❌ Request failed (Attempt ${attempt}/${MAX_RETRIES}):`,
        error
      );
      if (attempt === MAX_RETRIES) {
        console.warn("🔄 Queueing request after final failure:", url);
        await queueRequest({ url, method, body });
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
      await sendRequest(req.url, req.method, req.body);
      await removeQueuedRequest(req.id);
      console.log("✅ Successfully processed queued request:", req.url);
    } catch (error) {
      console.error("❌ Failed to process queued request:", req.url, error);
    }
  }
};

window.addEventListener("online", processQueuedRequests);
