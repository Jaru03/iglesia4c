"use client"; 

import { usePathname } from "next/navigation";

export default function HideInAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // LÓGICA: Si la ruta empieza por "/admin" o "/check-in", NO MUESTRES NADA.
  if (pathname.startsWith("/admin") || pathname.startsWith("/check-in")) {
    return null;
  }

  return <>{children}</>;
}