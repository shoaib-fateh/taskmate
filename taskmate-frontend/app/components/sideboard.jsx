import { BoxSelect, Plus, User2 } from "lucide-react";
import CustomAvatar from "@/components/custom-avatar";

export default function Sideboard({ className }) {
  const mockBoards = [
    {
      avatarFallback: "RJ",
      text: "Remote Job",
      avatarImage: "",
      color: "green",
    },
    {
      avatarFallback: "1F",
      text: "1-o-1 Freelancing",
      avatarImage: "",
      color: "yellow",
    },
  ];

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
          {mockBoards.map(({ avatarFallback, avatarImage, text, color }) => (
            <CustomAvatar
              avatarFallbackClass={`bg-${color}-500 rounded-full text-sm`}
              avatarFallback={avatarFallback}
              avatarImage={avatarImage}
              text={text}
              className="mb-1 cursor-pointer hover:opacity-85"
            />
          ))}
        </div>
      </nav>
    </div>
  );
}
