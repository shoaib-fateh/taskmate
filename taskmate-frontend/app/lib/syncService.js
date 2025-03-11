import { sendRequest } from "./apiClient";
import { getQueuedRequests, removeQueuedRequest } from "./requestQueue";

const syncOfflineRequests = async () => {
  if (!navigator.onLine) return;

  const requests = await getQueuedRequests();

  for (const req of requests) {
    try {
      const response = await sendRequest(req.url, req.method, req.body);
      if (response) await removeQueuedRequest(req.id);
      console.log("✅ Synced offline request:", req.url);
    } catch (error) {
      console.error("❌ Failed to sync request:", req.url, error);
    }
  }
};

window.addEventListener("online", syncOfflineRequests);
