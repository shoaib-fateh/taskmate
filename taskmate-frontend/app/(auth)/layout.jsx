import GoogleOneTapLogin from "@/components/GoogleOneTapLogin";
import RouteGuard from "@/components/route-guard";

export const metadata = {
  title: "Authentication | MyApp",
  description: "Login or register to access MyApp.",
};

export default function AuthLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body>
        <RouteGuard>{children}</RouteGuard>
        <GoogleOneTapLogin />
      </body>
    </html>
  );
}
