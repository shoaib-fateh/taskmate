"use client"

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

import { jwtDecode } from "jwt-decode";

const AvatarComponent = ({className}) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserData(decodedToken);
    }
  }, []);

  return (
    <Avatar className={`relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 select-none ${className}`}>
      <AvatarImage src={userData?.profileImage || ""} />
      <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-red-600 text-white text-sm uppercase">
        {userData?.username.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
