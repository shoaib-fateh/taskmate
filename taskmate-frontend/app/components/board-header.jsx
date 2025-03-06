"use client";

import { UserPlus2, Filter, Calendar, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BoardHeader() {
  return (
    <header className="sticky top-0 left-0 w-full border-b dark:border-gray-500 flex justify-between items-center h-[61px] py-[8px] px-8">
      <div className="flex items-center">
        <span className="text-xl text-gray-600 dark:text-white mr-3">
          Remote Jobs
        </span>

        <Button className="shadow-none bg-transparent text-gray-600 dark:text-gray-300 hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Star className="text-xl" />
        </Button>
        <Button className="shadow-none bg-transparent text-gray-600 dark:text-gray-300 hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Users className="text-xl" />
        </Button>
      </div>

      <div className="flex items-center">
        <Button className="shadow-none bg-transparent text-gray-600 dark:text-gray-300 hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200 flex items-center">
          <Calendar className="text-xl" />
        </Button>
        <Button className="shadow-none bg-transparent text-gray-600 dark:text-gray-300 hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200 flex items-center ml-6">
          <Filter className="text-xl" />
          <span className="text-sm font-medium">Filters</span>
        </Button>

        <div className="flex items-center space-x-4 border-l border-gray-400 pl-6">
          <Avatar className="w-8 h-8">
            <AvatarImage src="./assets/profile.jpg" />
            <AvatarFallback className="bg-red-600 text-white text-sm uppercase">
              VL
            </AvatarFallback>
          </Avatar>

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
