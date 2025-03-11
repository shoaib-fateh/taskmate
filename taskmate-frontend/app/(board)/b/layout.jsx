"use client";

import RouteGuard from "@/components/route-guard";
import Header from "@/components/header";
import Sideboard from "@/components/sideboard";
import BoardHeader from "@/components/board-header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { sendRequest } from "@/lib/apiClient";

// export const metadata = {
//   title: "Board",
//   description:
//     "Manage your account and access all features from your dashboard.",
// };

export default function BoardLayout({ children }) {
  const [boards, setBoards] = useState([]);
  const [members, setMembers] = useState([]);
  const { id1, id2, id3 } = useParams();
  const boardId = id2;

  const userData = useAuth();

  useEffect(() => {
    if (!userData?.uid) return;

    const fetchBoards = async () => {
      try {
        const data = await sendRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-boards?userId=${userData?.uid}`,
          "GET",
          null,
          "boards" // Save boards data in IndexedDB
        );

        setBoards(data || []);
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    };

    const fetchMembers = async () => {
      if (!boardId) return;
      try {
        const data = await sendRequest(
          `${process.env.NEXT_PUBLIC_API_URL}/api/boards/get-board-members/${boardId}`,
          "GET",
          null,
        );

        const membersWithDetails = await Promise.all(
          data?.members.map(async (member) => {
            const userData = await sendRequest(
              `${process.env.NEXT_PUBLIC_API_URL}/api/users/get-user/${member.userId}`,
              "GET",
              null,
              "users"
            );
            return { ...member, ...userData };
          }) || []
        );

        setMembers(membersWithDetails);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchBoards();
    fetchMembers();
  }, [boardId, userData?.uid]);
  return (
    <html lang="en">
      <head />
      <body className="dark:bg-transparent overflow-hidden">
        <Header />

        <div
          style={{
            minHeight: "calc(100vh - 40px)",
            backgroundImage: `url(/background-1.jpg)`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
          className="bg-gray-500/10"
        >
          <div className="flex items-start flex-row">
            <Sideboard
              className="sticky top-0 right-0 w-[320px] border-r border-gray-500/35 overflow-auto backdrop-blur-sm dark:bg-gray-800/70 bg-gray-50/85"
              members={members}
              boards={boards}
              userBoardId={boardId}
            />
            <div
              className=" overflow-auto"
              style={{
                height: "calc(100vh - 40px)",
                width: "100%",
              }}
            >
              <BoardHeader
                className="sticky top-0 left-0 h-[61px] py-[8px] px-8 w-full border-b backdrop-blur-sm bg-gray-200/30 dark:bg-gray-700/20"
                members={members}
                boards={boards}
                userBoardId={boardId}
              />
              <RouteGuard>{children}</RouteGuard>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
