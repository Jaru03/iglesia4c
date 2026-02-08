"use client"; 

import { usePathname } from "next/navigation";

export default function HideInAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Agregamos || pathname.startsWith("/kiosko") al final
  if (
    pathname.startsWith("/admin") || 
    pathname.startsWith("/check-in") || 
    pathname.startsWith("/kiosko") || 
    pathname === "/login"
  ) {
    return null;
  }

  return <>{children}</>;
}