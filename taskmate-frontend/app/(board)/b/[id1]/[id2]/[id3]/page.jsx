"use client"

import AddListButton from "@/components/add-list-button";
import List from "@/components/list";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function Board() {
  const [lists, setLists] = useState([]);
  const { id1, id2, id3 } = useParams();
  const boardId = id2;

  const fetchLists = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/lists/get-lists/${boardId}`);
      if (!res.ok) throw new Error("Failed to fetch lists");
      const data = await res.json();
      setLists(data || []);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [boardId]);

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {lists.map((list) => (
        <List key={list.listId} list={list} />
      ))}
      <AddListButton boardId={boardId} onListAdded={fetchLists} />
    </div>
  );
}
