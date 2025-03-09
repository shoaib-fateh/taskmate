"use client";

import { BoxSelect, Plus, User2 } from "lucide-react";
import CustomAvatar from "@/components/custom-avatar";
import Link from "next/link";

export default function Sideboard({ className, members, boards, userBoardId }) {
  return (
    <div className={className} style={{ height: "calc(100vh - 40px)" }}>
      {boards.map(({ boardId, boardTitle, visibility }, index) => (
        <>
          {boardId == userBoardId && (
            <CustomAvatar
              avatarFallback={boardTitle?.slice(0, 2).toUpperCase()}
              text={boardTitle}
              subtext={visibility}
            />
          )}
        </>
      ))}

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
              avatarFallbackClass="bg-red-600 rounded-full"
              avatarFallback={member.name?.slice(0, 2).toUpperCase() || ""}
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
              <Link key={index} href={boardUrl}>
                <CustomAvatar
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
