"use client";

import AddListButton from "@/components/add-list-button";
import List from "@/components/list";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { sendRequest } from "@/lib/apiClient";

export default function Board() {
  const [lists, setLists] = useState([]);
  const { id1, id2, id3 } = useParams();
  const boardId = id2;

  const fetchLists = async () => {
    try {
      let data = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/get-lists/${boardId}`,
        "GET"
      );

      data = data.sort((a, b) => a.order - b.order);

      setLists(data || []);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = lists.findIndex((list) => list.listId === active.id);
    const newIndex = lists.findIndex((list) => list.listId === over.id);

    const newLists = arrayMove(lists, oldIndex, newIndex);
    setLists(newLists);

    try {
      await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/lists/update-order`,
        "POST",
        {
          boardId,
          lists: newLists,
        }
      );
    } catch (error) {
      console.error("Error updating list order:", error);
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext
        items={lists.map((list) => list.listId)}
        strategy={horizontalListSortingStrategy}
      >
        <div
          className="flex gap-4 overflow-x-auto p-4"
          style={{
            height: "calc(100vh - 120px)",
          }}
        >
          {lists.map((list) => (
            <List key={list.listId} list={list} />
          ))}
          <AddListButton boardId={boardId} onListAdded={fetchLists} />
        </div>
      </SortableContext>
    </DndContext>
  );
}
