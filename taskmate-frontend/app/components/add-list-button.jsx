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
    <div className="w-64 min-h-[50px] p-4 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center justify-center">
      {isAdding ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title"
            className="p-2 border rounded-md w-full"
          />
          <button
            onClick={handleAddList}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
          >
            Add List
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-blue-500 hover:underline"
        >
          + Add List
        </button>
      )}
    </div>
  );
}
