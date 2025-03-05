"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function RouteGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");

    const authRoutes = ["/", "/login", "/signup"];
    const protectedRoutePrefix = "/d/";

    if (token && authRoutes.includes(pathname)) {
      router.replace("/d");
      return;
    }

    if (!token && pathname.startsWith(protectedRoutePrefix)) {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [pathname, router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="h-10 w-10 rounded-full border-4 border-gray-300 border-t-blue-600"
        ></motion.div>
      </div>
    );

  return <>{children}</>;
}
