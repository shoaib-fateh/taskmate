import { openDB } from "idb";

const DB_NAME = "taskmate-db";
const VERSION = 2;
const STORE_NAMES = ["boards", "lists", "users", "request-queue"];

const dbPromise = openDB(DB_NAME, VERSION, {
  upgrade(db, oldVersion, newVersion) {
    if (oldVersion === newVersion) return; // ✅ جلوگیری از افزایش الکی ورژن

    console.log(`📦 Upgrading IndexedDB from v${oldVersion} to v${newVersion}`);

    STORE_NAMES.forEach((storeName) => {
      if (!db.objectStoreNames.contains(storeName)) {
        console.log(`✅ Creating store: ${storeName}`);
        db.createObjectStore(storeName, { keyPath: "id" });
      }
    });
  },
});

/**
 * @param {string} storeName
 * @param {Array} data
 */
export const saveToIndexedDB = async (storeName, data) => {
  if (!STORE_NAMES.includes(storeName)) {
    throw new Error(`Invalid store name: ${storeName}`);
  }

  console.log(">>>>", JSON.stringify(data, null, 2));

  if (!Array.isArray(data)) {
    data = [data];
  }

  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);

  // پیدا کردن فیلد آیدی به‌صورت داینامیک
  data = data
    .map((item) => {
      const idKey = Object.keys(item).find((key) => key.endsWith("Id")); // هر کلیدی که به `Id` ختم بشه
      if (!idKey) {
        console.warn(`❌ No valid ID field found in`, item);
        return null;
      }
      return { id: item[idKey], ...item };
    })
    .filter(Boolean); // حذف موارد نامعتبر

  if (!data.length) {
    console.warn(`❌ No valid data to store in ${storeName}`);
    return;
  }

  await Promise.all(data.map((item) => store.put(item)));
  return tx.done;
};

/**
 * @param {string} storeName
 * @returns {Array}
 */
export const getFromIndexedDB = async (storeName) => {
  if (!STORE_NAMES.includes(storeName))
    throw new Error(`Invalid store name: ${storeName}`);
  const db = await dbPromise;
  return db.getAll(storeName);
};

/**
 * @param {string} storeName
 * @param {string} id
 */
export const deleteFromIndexedDB = async (storeName, id) => {
  if (!STORE_NAMES.includes(storeName))
    throw new Error(`Invalid store name: ${storeName}`);
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.delete(id);
  return tx.done;
};

/**
 * @param {string} storeName
 */
export const clearIndexedDB = async (storeName) => {
  if (!STORE_NAMES.includes(storeName))
    throw new Error(`Invalid store name: ${storeName}`);
  const db = await dbPromise;
  const tx = db.transaction(storeName, "readwrite");
  const store = tx.objectStore(storeName);
  await store.clear();
  return tx.done;
};

export const checkIndexedDB = async () => {
  const db = await dbPromise;
  console.log("🔎 IndexedDB stores:", db.objectStoreNames);
};

checkIndexedDB();
