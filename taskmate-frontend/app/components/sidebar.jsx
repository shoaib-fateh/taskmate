"use client"

import {
  Home,
  CheckSquare,
  Folder,
  Settings,
  User,
  BoxSelect,
  Plus,
} from "lucide-react";
import CustomAvatar from "./custom-avatar";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { sendRequest } from "@/lib/apiClient";
import Link from "next/link";

export default function Sidebar({ className }) {
  const [boards, setBoards] = useState([]);
  const { id1, id2, id3 } = useParams();
  const boardId = id2;

  const userData = useAuth();

  useEffect(() => {
    if (!userData?.uid) return;

    const fetchBoards = async () => {
      try {
        const data = await sendRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-boards?userId=${userData?.uid}`,
          "GET",
          null,
          "boards"
        );

        setBoards(data || []);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };
    fetchBoards();
  }, [boardId, userData?.uid]);

  return (
    <nav className={className}>
      <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent text-gray-800 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
        <Home className="text-xl" />
        <span className="text-sm font-medium">Home</span>
      </div>

      <div className="mb-[8px] flex justify-between min-h-[40px] p-2 rounded-lg bg-transparent text-gray-800 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Your Boards</span>
          </div>
          <Plus className="text-xl" />
        </div>

      <div className="my-3 border-b dark:border-gray-600/35 border-gray-400/60" />

      <div className="bord">
        {boards.map(({ boardId, boardTitle, coverImage, boardUrl, visibility }, index) => (
          <Link key={index} href={boardUrl}>
            <CustomAvatar
              avatarFallback={boardTitle.slice(0, 2).toUpperCase()}
              avatarImage={coverImage}
              text={boardTitle}
              subtext={visibility}
              className="mb-1 cursor-pointer hover:opacity-85"
            />
          </Link>
        ))}
      </div>
    </nav>
  );
}
