"use client"; 

import { usePathname } from "next/navigation";

export default function HideInAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Agregamos || pathname.startsWith("/kiosko") al final
  if (
    pathname.startsWith("/app") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/account") ||
    pathname.startsWith("/check-in") ||
    pathname.startsWith("/kiosko") ||
    pathname.startsWith("/responsable") ||
    pathname.startsWith("/usuario") ||
    pathname === "/login" ||
    pathname === "/registrarse"
  ) {
    return null;
  }

  return <>{children}</>;
}
