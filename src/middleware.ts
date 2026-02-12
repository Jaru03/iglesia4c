import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role as string;
    const path = req.nextUrl.pathname;

    if (path.startsWith("/admin") && role === "LIDER") {
      return NextResponse.redirect(new URL("/kiosko", req.url));
    }

    if (path.startsWith("/admin/equipo") && role === "ADMIN") {
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
    "/admin/:path*",
    "/kiosko/:path*",
  ],
};