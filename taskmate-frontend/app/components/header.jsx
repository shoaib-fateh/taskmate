"use client";

import { Bell, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="w-full border-b border-gray-500 flex justify-between items-center max-h-[48px] p-[8px]">
      <div className="flex items-center space-x-4">
        <span className="text-xl text-gray-800 dark:text-white">
          Task<b className="font-bold">Mate</b>
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Create Button */}
        <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 py-1.5 px-2 pr-3 rounded-md">
          <Plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="text-gray-600 dark:text-gray-300">Create</span>
        </button>

        {/* Notifications Button */}
        <button className="relative flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-md">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute right-[10px] bottom-[21px] text-xs bg-red-500 text-white rounded-full w-2 h-2"></span>
        </button>

        {/* Profile Section */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="w-8 h-8 cursor-pointer select-none rounded-full bg-red-800 text-white flex items-center justify-center"
          >
            VL
          </div>

          {/* Profile Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-[180px] bg-white dark:bg-gray-700 border rounded-md shadow-lg z-10">
              <div className="py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                Profile
              </div>
              <div className="py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                Settings
              </div>
              <div className="py-2 px-4 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">
                Theme
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
