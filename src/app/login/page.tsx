import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Lógica de roles:
    // Si intenta entrar a /admin y NO es ADMIN (es líder), lo mandamos al check-in
    if (req.nextUrl.pathname.startsWith("/admin") && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/check-in", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Solo deja pasar si tiene token (está logueado)
    },
  }
);

// AQUÍ DICES QUÉ RUTAS PROTEGES
export const config = {
  matcher: ["/admin/:path*", "/check-in/:path*"], // Protege todo lo que empiece por /admin o /check-in
};