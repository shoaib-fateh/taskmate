import "../styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import RouteGuard from "@/components/route-guard";

export const metadata = {
  title: "Task Mate",
  description:
    "Because task management shouldn’t feel like a task itself. We built TaskMate to be fast, lightweight, and distraction-free—focusing on what matters most: getting work done.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <RouteGuard>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </RouteGuard>
      </body>
    </html>
  );
}
