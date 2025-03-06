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

        <div style={{ minHeight: "calc(100vh - 40px)" }}>
          <div className="flex items-start flex-row">
            <Sideboard className="sticky top-0 right-0 w-[280px] border-r border-gray-500 overflow-auto" />
            <div
              className=" bg-gray-700 overflow-auto"
              style={{ height: "calc(100vh - 40px)", width: "100%"  }}
            >
              <BoardHeader />
              <RouteGuard>{children}</RouteGuard>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
