"use client"; 

import { usePathname } from "next/navigation";

export default function HideInAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin") || pathname.startsWith("/check-in") || pathname === "/login") {
    return null;
  }

  return <>{children}</>;
}