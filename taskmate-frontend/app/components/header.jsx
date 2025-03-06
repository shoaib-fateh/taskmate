"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Moon, Sun, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";

export default function Header() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 left-0 w-full border-b dark:border-gray-500 flex justify-between items-center max-h-[48px] py-[8px] px-8">
      <div className="flex items-center space-x-4">
        <span className="text-xl text-gray-600 dark:text-white">
          Task<b className="font-bold dark:text-white">Mate</b>
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Create Button */}
        <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 py-1.5 px-2 pr-3 rounded-md"></button>

        <DropdownMenu>
          <DropdownMenuTrigger className="select-none outline-none">
            <Button
              variant="outline"
              className=" dark:bg-blue-500 dark:text-white"
            >
              Create Board
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px] absolute right-0 mt-4 pt-4 pb-2 px-4 bg-white dark:bg-gray-800 rounded-md z-10 shadow-lg border dark:border-gray-700 flex flex-col"
            align="end"
          >
            <Input
              name="board-title"
              placeholder="Board Title"
              className="dark:border-gray-600"
            />

            <select
              name="visibility"
              id=""
              className="my-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-gray-600"
            >
              <option value="private">Privete</option>
              <option value="public">Public</option>
            </select>

            <Button
              variant="outline"
              className=" dark:bg-blue-500 dark:text-white"
            >
              Create
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications Button */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md outline-none">
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute right-[10px] bottom-[21px] text-xs bg-red-500 text-white rounded-full w-2 h-2"></span>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[330px] min-h-[230px] absolute right-0 mt-4 pt-4 pb-2 px-4 bg-white dark:bg-gray-800 rounded-md z-10 shadow-lg border dark:border-gray-700"
            align="end"
          >
            <div className="">
              <span className="text-xl text-gray-300 font-bold">
                Notifications
              </span>
            </div>
            <div className="my-4 border-b dark:border-gray-600" />
            <div className="flex items-center justify-center pt-12">
              <span className="dark:text-gray-300 uppercase text-xs">
                No unread notifications
              </span>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Section */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center content-center space-x-2 cursor-pointer select-none outline-none">
              <Avatar className="w-8 h-8">
                <AvatarImage src="./assets/profile.jpg" />
                <AvatarFallback className="bg-red-600 text-white text-sm uppercase">
                  VL
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[280px] min-h-[330px] absolute right-0 mt-4 pt-4 pb-2 px-4 bg-white dark:bg-gray-800 rounded-md z-10 shadow-lg border dark:border-gray-700"
              align="end"
            >
              <span className="uppercase text-xs text-gray-600 dark:text-gray-300 p-2">
                account
              </span>
              <div className="flex items-center justify-left space-x-3 py-2">
                <Avatar className="w-9 h-9 select-none">
                  <AvatarImage src="./assets/profile.jpg" />
                  <AvatarFallback className="bg-red-600 text-white text-sm uppercase">
                    VL
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="dark:text-gray-300 text-sm capitalize">
                    Void Lander
                  </span>
                  <span className="dark:text-gray-300 text-xs">
                    void.land7@void.ai
                  </span>
                </div>
              </div>

              <div className="my-2 border-b dark:border-gray-600" />

              <span className="uppercase text-xs text-gray-600 dark:text-gray-300 p-2">
                gneral
              </span>

              <div className="flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
                <span className="text-sm font-medium">Edit Profile</span>
              </div>
              <div className="flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
                <span className="text-sm font-medium">Boards</span>
              </div>

              <div className="my-2 border-b dark:border-gray-600" />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="text-sm font-medium flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
                    Theme
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="p-2 bg-white dark:bg-gray-800 rounded-md z-10 shadow-lg border dark:border-gray-700"
                >
                  <div
                    className="flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200"
                    onClick={() => setTheme("light")}
                  >
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div
                    className="flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200"
                    onClick={() => setTheme("dark")}
                  >
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div
                    className="flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200"
                    onClick={() => setTheme("system")}
                  >
                    <span className="text-sm font-medium">System</span>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="my-2 border-b dark:border-gray-600" />

              <Button className="w-full" variant="destructive">
                <span className="text-sm font-medium">Logout</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
