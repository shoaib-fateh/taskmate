import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function CustomAvatar({
  avatarFallbackClass,
  avatarFallback,
  avatarImage,
  text,
  subtext,
  className,
}) {
  return (
    <div
      className={`${className} flex items-center justify-left space-x-3 select-none px-3`}
    >
      <Avatar className="w-9 h-9">
        <AvatarImage src={avatarImage} />
        <AvatarFallback>
          <div
            className={`${
              avatarFallbackClass && avatarFallbackClass
            } " bg-blue-500 rounded text-lg text-white uppercase w-9 h-9 flex items-center justify-center`}
          >
            {avatarFallback}
          </div>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="dark:text-gray-300 text-sm capitalize">{text}</span>
        <span className="dark:text-gray-300 text-xs capitalize">{subtext}</span>
      </div>
    </div>
  );
}
