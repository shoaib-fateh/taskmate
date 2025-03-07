import RouteGuard from "@/components/route-guard";
import Header from "@/components/header";
import Sideboard from "@/components/sideboard";
import BoardHeader from "@/components/board-header";

export const metadata = {
  title: "Board",
  description:
    "Manage your account and access all features from your dashboard.",
};

export default function BoardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="dark:bg-transparent overflow-hidden">
        <Header />

        <div style={{ minHeight: "calc(100vh - 40px)",
            backgroundImage: `url(/background-${Math.floor(Math.random() * 4)}.jpg)`,
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
         }}
         className="bg-gray-500/10"
         >
          <div className="flex items-start flex-row">
            <Sideboard className="sticky top-0 right-0 w-[320px] border-r border-gray-500/35 overflow-auto backdrop-blur-sm dark:bg-gray-800/70 bg-gray-50/85" />
            <div
              className=" overflow-auto"
              style={{
                height: "calc(100vh - 40px)",
                width: "100%",
              }}
            >
              <BoardHeader className="sticky top-0 left-0 h-[61px] py-[8px] px-8 w-full border-b backdrop-blur-sm bg-gray-200/30 dark:bg-gray-700/20" />
              <RouteGuard>{children}</RouteGuard>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
