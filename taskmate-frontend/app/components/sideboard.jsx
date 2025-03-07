"use client";

import { BoxSelect, Plus, User2 } from "lucide-react";
import CustomAvatar from "@/components/custom-avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";


export default function Sideboard({ className }) {
  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const { id1, id2, id3 } = useParams();
  const boardId = id2;

  const userData = useAuth()

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-boards?userId=${userData?.uid}`, {
          method: "GET",
        });
        console.log(res);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setBoards(data || []);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    const fetchMembers = async () => {
      if (!boardId) return;
      try {
        const res = await fetch(`/api/get-board-members/${boardId}`);
        const data = await res.json();
        setMembers(data.members || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchBoards();
    // fetchMembers();
  }, [boardId]);

  const mockMembers = [
    {
      avatarFallback: "SF",
      avatarImage: "",
      text: "Shoaib Fateh",
      subtext: "admin",
      color: "yellow",
    },
    {
      avatarFallback: "AL",
      avatarImage: "",
      text: "Ahmad Leo",
      subtext: "member",
      color: "gray",
    },
    {
      avatarFallback: "SS",
      avatarImage: "",
      text: "Sarah Smith",
      subtext: "member",
      color: "green",
    },
  ];

  return (
    <div className={className} style={{ height: "calc(100vh - 40px)" }}>
      <CustomAvatar avatarFallback="RJ" text="Remote Job" subtext="Private" />

      <div className="my-3 border-b dark:border-gray-600/35 border-gray-400/60" />

      <nav className="px-3">
        <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent text-gray-800 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <BoxSelect className="text-xl" />
          <span className="text-sm font-medium">Boards</span>
        </div>
        {/* Members */}
        <div className="mb-[8px] flex justify-between min-h-[40px] p-2 rounded-lg bg-transparent text-gray-800 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <div className="flex items-center space-x-2">
            <User2 className="text-xl" />
            <span className="text-sm font-medium">Members</span>
          </div>
          <Plus className="text-xl" />
        </div>
        <div className="my-3 border-b dark:border-yellow-600/35 border-gray-400/60" />
        <div className="members">
          {mockMembers.map(
            ({ avatarFallback, avatarImage, text, subtext, color }) => (
              <CustomAvatar
                avatarFallbackClass={`bg-${color}-500 rounded-full text-sm`}
                avatarFallback={avatarFallback}
                avatarImage={avatarImage}
                text={text}
                subtext={subtext}
              />
            )
          )}
        </div>

        {/* Boards */}
        <div className="my-3 border-b dark:border-gray-600/35 border-gray-400/60" />

        <div className="mb-[8px] flex justify-between min-h-[40px] p-2 rounded-lg bg-transparent text-gray-800 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Your Boards</span>
          </div>
          <Plus className="text-xl" />
        </div>

        <div className="bord">
          {boards.map(({ boardId, boardTitle, coverImage }, index) => (
            <CustomAvatar
              key={index}
              avatarFallback={boardTitle.slice(0, 2).toUpperCase()}
              avatarImage={coverImage}
              text={boardTitle}
              className="mb-1 cursor-pointer hover:opacity-85"
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
