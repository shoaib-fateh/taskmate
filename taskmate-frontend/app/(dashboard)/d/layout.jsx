import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "../../components/ui/navbar";
import RouteGuard from "@/components/route-guard";

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
      <body className="flex">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Navbar>
              <SidebarTrigger />
            </Navbar>
            <main className="p-6">
              <RouteGuard>{children}</RouteGuard>
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
