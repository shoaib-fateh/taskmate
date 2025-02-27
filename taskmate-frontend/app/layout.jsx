// app/layout
import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Navbar } from "./components/ui/navbar";

export const metadata = {
  title: "Task Mate",
  description:
    "Because task management shouldn’t feel like a task itself. We built TaskMate to be fast, lightweight, and distraction-free—focusing on what matters most: getting work done.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className="flex">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Navbar>
                  <SidebarTrigger />
                </Navbar>
                <main className="p-6">{children}</main>
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
