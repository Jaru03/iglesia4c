// src/middleware.ts
import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Si no están logueados, los manda aquí
  },
});

export const config = {
  // Protegemos todo lo que empiece por /admin
  matcher: ["/admin/:path*"],
};