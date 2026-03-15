import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

type Role = "ADMIN" | "MEMBER" | "USER" | "RESPONSIBLE" | "LEADER" | "PASTOR" | "COUNCIL_MEMBER" | "CO_LEADER" | "SERVANT" | "VOLUNTEER";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role as Role | undefined;
    const path = req.nextUrl.pathname;

    if (!role) return NextResponse.next();

    // kiosko — ADMIN y MEMBER
    if (path.startsWith("/kiosko")) {
      if (!["ADMIN", "MEMBER"].includes(role)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    // iglesias — ADMIN only
    if (path.startsWith("/app/iglesias")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/app/dashboard", req.url));
      }
    }

    // iglesia — RESPONSIBLE only
    if (path.startsWith("/app/iglesia") && !path.startsWith("/app/iglesias")) {
      if (role !== "RESPONSIBLE") {
        return NextResponse.redirect(new URL("/app/dashboard", req.url));
      }
    }

    // miembros, peticiones — ADMIN y RESPONSIBLE
    if (path.startsWith("/app/miembros") || path.startsWith("/app/peticiones")) {
      if (!["ADMIN", "RESPONSIBLE"].includes(role)) {
        return NextResponse.redirect(new URL("/app/dashboard", req.url));
      }
    }

    // departamentos, actividades — ADMIN, RESPONSIBLE, LEADER
    if (
      path.startsWith("/app/departamentos") ||
      path.startsWith("/app/actividades")
    ) {
      if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
        return NextResponse.redirect(new URL("/app/dashboard", req.url));
      }
    }

    // personas — ADMIN, RESPONSIBLE, LEADER tienen acceso completo
    // /app/personas/nuevo también es accesible para MEMBER (Atención Primaria, verificado en la página)
    if (path.startsWith("/app/personas") && path !== "/app/personas/nuevo") {
      if (!["ADMIN", "RESPONSIBLE", "LEADER"].includes(role)) {
        return NextResponse.redirect(new URL("/app/dashboard", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/login" },
    callbacks: { authorized: ({ token }) => !!token },
  }
);

export const config = {
  matcher: [
    "/app/:path*",
    "/kiosko/:path*",
  ],
};
