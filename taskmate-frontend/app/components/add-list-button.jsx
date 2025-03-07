import { useState } from "react";

export default function AddListButton({ boardId, onListAdded }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleAddList = async () => {
    if (!title.trim()) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lists/create-list`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ boardId, title }),
      });

      if (!res.ok) throw new Error("Failed to add list");

      setTitle("");
      setIsAdding(false);
      onListAdded();
    } catch (error) {
      console.error("Error adding list:", error);
    }
  };

  return (
    <div className="max-h-[120px] min-w-[256px] p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-lg rounded-lg shadow-lg 
        flex items-center justify-center transition-all duration-300">
      {isAdding ? (
        <div className="flex flex-col w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title..."
            className="p-2 border-2 border-gray-300 dark:border-gray-700 rounded-md w-full 
              focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddList}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex-1 
                hover:bg-blue-600 transition-all duration-200"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-md 
                hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-blue-500 dark:text-blue-400 font-medium hover:underline transition-all duration-200"
        >
          + Add List
        </button>
      )}
    </div>
  );
}
