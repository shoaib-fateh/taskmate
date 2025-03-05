import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes (accessible without login)
  const publicRoutes = ["/", "/login", "/signup"];

  if (token) {
    // If logged in, prevent access to login/signup
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/d", req.url));
    }
  } else {
    // If NOT logged in, block access to /d/*
    if (pathname.startsWith("/d")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/d/:path*"], // Apply to these routes
};
