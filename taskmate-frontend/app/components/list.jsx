import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function List({ list }) {
  const [cards, setCards] = useState(list.cards || []);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  // 🛠 درگ فقط روی هدر
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: list.listId,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/cards/create-card`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ listId: list.listId, title: newCardTitle }),
        }
      );

      if (!res.ok) throw new Error("Failed to add card");

      const newCard = await res.json();
      setCards([...cards, newCard]);
      setNewCardTitle("");
      setIsAdding(false);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  return (
    <div>
      <div
        ref={setNodeRef}
        style={style}
        className="min-h-[120px] min-w-[256px] bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md flex flex-col"
      >
        <div
          {...attributes}
          {...listeners}
          className="p-3 bg-gray-300 dark:bg-gray-700 text-lg font-semibold rounded-t-lg cursor-grab active:cursor-grabbing"
        >
          {list.title}
        </div>

        <div className="flex flex-col gap-2 p-3 min-h-[100px]">
          {cards.map((card) => (
            <div
              key={card.cardId}
              className="bg-white dark:bg-gray-900 p-2 rounded shadow"
            >
              {card.title}
            </div>
          ))}
        </div>

        <div className="p-2">
          {isAdding && (
            <div className="flex flex-col gap-2">
              <textarea
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Enter card title..."
                className="p-2 border rounded-md w-full focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCard}
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Add Card
                </button>
                <button
                  onClick={() => setIsAdding(false)}
                  className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsAdding(true)}
            className={`w-full text-blue-500 hover:underline text-left px-2 py-1 ${
              isAdding ? "hidden" : ""
            }`}
          >
            + Add a card
          </button>
        </div>
      </div>
    </div>
  );
}
