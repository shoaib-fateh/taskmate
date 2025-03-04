// app/layout
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "../../components/ui/navbar";
import { AuthProvider } from "@/context/AuthContext";

export default function DashboardLayout({ children }) {
  return (
    <>
      <html>
        <head />
        <body className="flex">
          <SidebarProvider>
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <Navbar>
                <SidebarTrigger />
              </Navbar>
              <main className="p-6">{children}</main>
            </div>
          </SidebarProvider>
        </body>
      </html>
    </>
  );
}
