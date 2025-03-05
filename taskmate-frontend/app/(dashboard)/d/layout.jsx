import RouteGuard from "@/components/route-guard";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export const metadata = {
  title: "Dashboard | MyApp",
  description:
    "Manage your account and access all features from your dashboard.",
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="bg-transparent">
        <Header />

        <div style={{ minHeight: "calc(100vh - 40px)" }}>
          <div className="mx-auto max-w-[1100px] flex items-start flex-row justify-center pb-[40px]">
            <Sidebar className="max-sm:hidden mt-[40px] max-h-[90vh] px-[16px] sticky top-[40px] w-[256px]" />

            <div className="mt-[40px] max-sm:w-[500px] sm:pl-[45px] w-[620px]">
              <RouteGuard>{children}</RouteGuard>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
