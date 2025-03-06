import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { BoxSelect, Plus, User2 } from "lucide-react";
import CustomAvatar from "@/components/custom-avatar";

export default function Sideboard({ className }) {
  const mockBoards = [
    {
      avatarFallback: "RJ",
      text: "Remote Job",
      avatarImage: "",
    },
    {
      avatarFallback: "1F",
      text: "1-o-1 Freelancing",
      avatarImage: "",
    },
  ];

  const mockMembers = [
    {
      avatarFallback: "SF",
      avatarImage: "",
      text: "Shoaib Fateh",
      subtext: "admin",
    },
    {
      avatarFallback: "AL",
      avatarImage: "",
      text: "Ahmad Leo",
      subtext: "member",
    },
    {
      avatarFallback: "SS",
      avatarImage: "",
      text: "Sarah Smith",
      subtext: "member",
    },
  ];

  return (
    <div className={className} style={{ height: "calc(100vh - 40px)" }}>
      <CustomAvatar avatarFallback="RJ" text="Remote Job" subtext="Private" />
      <div className="my-3 border-b dark:border-gray-600" />

      <nav className="px-3">
        <div className="mb-[8px] flex items-center min-h-[40px] p-2 rounded-lg bg-transparent text-gray-600 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <BoxSelect className="text-xl" />
          <span className="text-sm font-medium">Boards</span>
        </div>
        {/* Members */}
        <div className="mb-[8px] flex justify-between min-h-[40px] p-2 rounded-lg bg-transparent text-gray-600 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <div className="flex items-center space-x-2">
            <User2 className="text-xl" />
            <span className="text-sm font-medium">Members</span>
          </div>
          <Plus className="text-xl" />
        </div>
        <div className="my-3 border-b dark:border-gray-600" />
        <div className="members">
          {mockMembers.map(({ avatarFallback, avatarImage, text, subtext }) => (
            <CustomAvatar
              avatarFallbackClass="bg-green-500 rounded-full text-sm"
              avatarFallback={avatarFallback}
              avatarImage={avatarImage}
              text={text}
              subtext={subtext}
            />
          ))}
        </div>

        {/* Boards */}
        <div className="my-3 border-b dark:border-gray-600" />

        <div className="mb-[8px] flex justify-between min-h-[40px] p-2 rounded-lg bg-transparent text-gray-600 dark:text-gray-300 gap-[8px] hover:bg-[#a6c5e229] hover:dark:bg-gray-600 cursor-pointer select-none transition-all duration-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">Your Boards</span>
          </div>
          <Plus className="text-xl" />
        </div>

        <div className="bord">
          {mockBoards.map(({ avatarFallback, avatarImage, text }) => (
            <CustomAvatar
              avatarFallbackClass="bg-green-500 rounded-full text-sm"
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
