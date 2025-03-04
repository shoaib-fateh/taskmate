import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
  const token = cookies().get("token")?.value;
  const isAuthRoute = ["/login", "/register"].includes(req.nextUrl.pathname);
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/d");

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/d", req.url));
  }

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/login", "/signup", "/d/:path*"],
};
