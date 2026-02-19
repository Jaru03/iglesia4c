import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

type Role = "ADMIN" | "MEMBER" | "USER";

export default withAuth(
  function middleware(req) {
    const role = req.nextauth.token?.role as Role | undefined;
    const path = req.nextUrl.pathname;

    if (!role) return NextResponse.next();

    if (path.startsWith("/admin")) {
      if (role !== "ADMIN") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    if (path.startsWith("/kiosko")) {
      if (role !== "ADMIN" && role !== "MEMBER") {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    }

    if (path.startsWith("/registro")) {
      if (!["ADMIN", "MEMBER"].includes(role)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
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
