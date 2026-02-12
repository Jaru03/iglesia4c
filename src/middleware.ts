// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 1. Sacamos el rol del token
    const role = req.nextauth.token?.role as string;
    const path = req.nextUrl.pathname;
    
    // --- REGLAS PARA EL LIDER ---
    // Si es LIDER y quiere entrar al Admin o a la Home -> ¡Al Kiosco!
    if ((path.startsWith("/admin") || path === "/") && role === "LIDER") {
      return NextResponse.redirect(new URL("/kiosko", req.url));
    }

    // --- REGLAS PARA EL ADMIN (NORMAL) ---
    // Si es ADMIN y quiere entrar a "Equipo" o "Usuarios" -> ¡Bloqueado!
    // (Asumo que tu ruta para crear admins es /admin/equipo o /admin/usuarios)
    if (path.startsWith("/admin/equipo") && role === "ADMIN") {
       // Lo mandamos de vuelta al dashboard principal, no tiene permiso aquí
       return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/",            
    "/admin/:path*", 
    "/kiosko/:path*", 
  ],
};