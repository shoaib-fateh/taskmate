"use client";

import { BoxSelect, Plus, User2 } from "lucide-react";
import CustomAvatar from "@/components/custom-avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export default function Sideboard({ className }) {
  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const { id1, id2, id3 } = useParams();
  const boardId = id2;

  const userData = useAuth();

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-boards?userId=${userData?.uid}`,
          {
            method: "GET",
          }
        );

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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-board-members/${boardId}`
        );
        const data = await res.json();

        const membersWithDetails = await Promise.all(
          data.members.map(async (member) => {
            const userRes = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/users/get-user/${member.userId}`
            );
            const userData = await userRes.json();
            return { ...member, ...userData };
          })
        );

        setMembers(membersWithDetails);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchBoards();
    fetchMembers();
  }, [boardId]);

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
        <div className="my-3 border-b dark:border-gray-600/35 border-gray-400/60" />
        <div className="members">
          {members.map((member, index) => (
            <CustomAvatar
              key={member.userId || index}
              avatarFallbackClass="bg-gray-500 rounded-full text-sm"
              avatarFallback={member.name?.charAt(0) || ""}
              avatarImage={member.profileImage || ""}
              text={member.name || ""}
              subtext={member.role}
            />
          ))}
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
          {boards.map(
            ({ boardId, boardTitle, coverImage, boardUrl }, index) => (
              <Link href={boardUrl}>
                <CustomAvatar
                  key={index}
                  avatarFallback={boardTitle.slice(0, 2).toUpperCase()}
                  avatarImage={coverImage}
                  text={boardTitle}
                  className="mb-1 cursor-pointer hover:opacity-85"
                />
              </Link>
            )
          )}
        </div>
      </nav>
    </div>
  );
}
