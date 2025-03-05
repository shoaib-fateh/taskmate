import {
  Home,
  CheckSquare,
  Folder,
  Settings,
  User,
} from "lucide-react";

export default function Sidebar({className}) {
  return (
    <nav className={className}>
      <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
        <Home className="text-xl" />
        <span className="text-sm font-medium">Home</span>
      </div>

      <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
        <CheckSquare className="text-xl" />
        <span className="text-sm font-medium">Boards</span>
      </div>

      <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
        <Folder className="text-xl" />
        <span className="text-sm font-medium">Projects</span>
      </div>

      <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
        <Settings className="text-xl" />
        <span className="text-sm font-medium">Settings</span>
      </div>

      <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent dark:text-[#B6C2CF] gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
        <User className="text-xl" />
        <span className="text-sm font-medium">Profile</span>
      </div>
    </nav>
  );
}
