"use client";

import { UserPlus2, Filter, Calendar, Users, Star, Link } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function BoardHeader({
  className,
  members,
  boards,
  userBoardId,
}) {
  return (
    <header
      className={`${className} border-gray-500/35 flex justify-between items-center`}
    >
      <div className="flex items-center">
        {boards.map(({ boardId, boardTitle, coverImage, boardUrl }, index) => (
          <>
            {boardId == userBoardId && (
              <span className="text-xl text-gray-100 dark:text-white mr-3">
                {boardTitle}
              </span>
            )}
          </>
        ))}

        <Button className="shadow-none bg-transparent text-white dark:text-white hover:bg-gray-200/15 hover:dark:bg-gray-300/15 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Star className="text-xl" />
        </Button>
        <Button className="shadow-none bg-transparent text-white dark:text-white hover:bg-gray-200/15 hover:dark:bg-gray-300/15 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Users className="text-xl" />
        </Button>
      </div>

      <div className="flex items-center">
        <Button className="shadow-none bg-transparent text-white dark:text-white hover:bg-gray-200/15 hover:dark:bg-gray-300/15 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Calendar className="text-xl" />
        </Button>
        <Button className="shadow-none bg-transparent text-white dark:text-white hover:bg-gray-200/15 hover:dark:bg-gray-300/15 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Filter className="text-xl" />
          <span className="text-sm font-medium">Filters</span>
        </Button>

        <div className="flex items-center space-x-4 border-l border-gray-400 pl-6 select-none ml-6">
          {members.map((member, index) => (
            <Avatar
              className={`relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 select-none`}
              key={member.userId || index}
            >
              <AvatarImage src={member.profileImage || ""} />
              <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-red-600 text-white text-sm uppercase">
                {member.name?.slice(0, 2).toUpperCase()}
                {/* {member.role} */}
              </AvatarFallback>
            </Avatar>
          ))}

          <Button
            variant="outline"
            className="flex items-center dark:bg-white dark:text-black dark:border-gray-600 dark:hover:opacity-90"
          >
            <UserPlus2 className="text-xl" />
            <span className="text-sm font-medium">Share</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
