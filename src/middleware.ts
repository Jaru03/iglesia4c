import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role as string;
    const path = req.nextUrl.pathname;

    // --- REGLAS PARA EL LIDER ---
    if (path.startsWith("/admin") && role === "LIDER") {
      return NextResponse.redirect(new URL("/kiosko", req.url));
    }

    // --- REGLAS PARA ADMIN NORMAL ---
    if (path.startsWith("/admin/equipo") && role === "ADMIN") {
       return NextResponse.redirect(new URL("/admin", req.url));
    }

    // --- REGLAS PARA UJIERES (NUEVO) ---
    // Si tiene rol REGISTRO y quiere entrar al admin o a la home -> ¡Al registro!
    if ((path.startsWith("/admin") || path === "/") && role === "REGISTRO") {
      return NextResponse.redirect(new URL("/registro", req.url));
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
    "/admin/:path*",
    "/kiosko/:path*",
    "/registro/:path*",
  ],
};