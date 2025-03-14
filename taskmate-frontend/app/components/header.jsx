"use client";

import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import AvatarComponent from "@/components/avatar-component";

import useAuth from "@/hooks/useAuth";
import NetworkStatus from "./network-status";
import { sendRequest } from "@/lib/apiClient";

export default function Header() {
  const { setTheme } = useTheme();
  const router = useRouter();
  const userData = useAuth()

  const [selectedOption, setSelectedOption] = useState("private");
  const [isOpen, setIsOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState("");

  const handleSelectChange = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };



  const handleCreateBoard = async () => {
    if (!userData?.uid || !boardTitle.trim()) {
      console.error("User ID or Board Title is missing!");
      return;
    }

    try {
      const response = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/api/boards/create-board`,
        "POST",
        {
          userId: userData.uid,
          boardTitle,
          visibility: selectedOption,
        }
      );

      // if (!response.ok) {
      //   throw new Error("Failed to create board");
      // }

      // const data = await response.json();

      // router.push(data.boardUrl);
    } catch (error) {
      console.error("Error creating board:", error);
    }
  };

  return (
    <header className="sticky top-0 left-0 w-full border-b dark:border-gray-500/35 flex justify-between items-center max-h-[48px] py-[8px] px-8">
      <div className="flex items-center space-x-4">
        <span className="text-xl text-gray-600 dark:text-white">
          Task<b className="font-bold dark:text-white">Mate</b>
          <NetworkStatus />
        </span>
      </div>

      <div className="flex items-center space-x-4">
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
              onChange={(e) => setBoardTitle(e.target.value)}
            />

            <div className="my-2 flex flex-col w-full relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-2 px-3 text-left border dark:border-gray-600 rounded-md bg-transparent"
              >
                {selectedOption === "private" ? "Private" : "Public"}
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="sticky top-12 left-0 mt-3 w-full bg-white dark:bg-gray-800 border dark:border-gray-600 rounded-md shadow-lg z-20"
                  >
                    <div
                      className={`option py-2 px-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        selectedOption === "private"
                          ? "bg-gray-300 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => handleSelectChange("private")}
                    >
                      <div className="font-semibold">Private</div>
                      <small className="text-sm text-gray-600 dark:text-gray-300">
                        Only invited members can access the board.
                      </small>
                    </div>
                    <div
                      className={`option py-2 px-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 ${
                        selectedOption === "public"
                          ? "bg-gray-300 dark:bg-gray-700"
                          : ""
                      }`}
                      onClick={() => handleSelectChange("public")}
                    >
                      <div className="font-semibold">Public</div>
                      <small className="text-sm text-gray-600 dark:text-gray-300">
                        Anyone can find and access the board.
                      </small>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button
              variant="outline"
              className=" dark:bg-blue-500 dark:text-white"
              onClick={() => handleCreateBoard()}
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
              <span className="text-xl text-gray-600 dark:text-gray-300 font-bold">
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
              <AvatarComponent className="w-9 h-9" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[280px] min-h-[330px] absolute right-0 mt-4 pt-4 pb-2 px-4 bg-white dark:bg-gray-800 rounded-md z-10 shadow-lg border dark:border-gray-700"
              align="end"
            >
              <span className="uppercase text-xs text-gray-600 dark:text-gray-300 p-2">
                account
              </span>
              <div className="flex items-center justify-left space-x-3 py-2">
                <AvatarComponent className="w-9 h-9" />

                <div className="flex flex-col">
                  <span className="dark:text-gray-300 text-sm capitalize">
                    {userData?.username}
                  </span>
                  <span className="dark:text-gray-300 text-xs">
                    {userData?.email}
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

              <Button
                onClick={handleLogout}
                className="w-full"
                variant="destructive"
              >
                <span className="text-sm font-medium">Logout</span>
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
