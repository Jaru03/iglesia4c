import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy route redirects → /app/*
      { source: "/admin", destination: "/app/dashboard", permanent: false },
      { source: "/admin/:path*", destination: "/app/dashboard", permanent: false },
      { source: "/responsable", destination: "/app/dashboard", permanent: false },
      { source: "/responsable/:path*", destination: "/app/dashboard", permanent: false },
      { source: "/usuario", destination: "/app/dashboard", permanent: false },
      { source: "/usuario/:path*", destination: "/app/dashboard", permanent: false },
      { source: "/lider", destination: "/app/dashboard", permanent: false },
      { source: "/lider/:path*", destination: "/app/dashboard", permanent: false },
      // Old /dashboard/* → /app/dashboard/*
      { source: "/dashboard", destination: "/app/dashboard", permanent: false },
      { source: "/dashboard/:path*", destination: "/app/dashboard/:path*", permanent: false },
      // Old clean routes → /app/*
      { source: "/departamento", destination: "/app/departamentos", permanent: false },
      { source: "/departamento/:path*", destination: "/app/departamentos", permanent: false },
      { source: "/departamentos", destination: "/app/departamentos", permanent: false },
      { source: "/departamentos/:path*", destination: "/app/departamentos/:path*", permanent: false },
      { source: "/personas", destination: "/app/personas", permanent: false },
      { source: "/personas/:path*", destination: "/app/personas/:path*", permanent: false },
      { source: "/asistencias", destination: "/app/asistencias", permanent: false },
      { source: "/asistencias/:path*", destination: "/app/asistencias/:path*", permanent: false },
      { source: "/iglesias", destination: "/app/iglesias", permanent: false },
      { source: "/iglesias/:path*", destination: "/app/iglesias/:path*", permanent: false },
      { source: "/iglesia", destination: "/app/iglesia", permanent: false },
      { source: "/iglesia/:path*", destination: "/app/iglesia/:path*", permanent: false },
      { source: "/miembros", destination: "/app/miembros", permanent: false },
      { source: "/miembros/:path*", destination: "/app/miembros/:path*", permanent: false },
      { source: "/peticiones", destination: "/app/peticiones", permanent: false },
      { source: "/peticiones/:path*", destination: "/app/peticiones/:path*", permanent: false },
      { source: "/perfil", destination: "/app/perfil", permanent: false },
      { source: "/perfil/:path*", destination: "/app/perfil/:path*", permanent: false },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'northeurope1-mediap.svc.ms',
      },
      {
        hostname: 'i.ytimg.com',
      },
      {
        hostname: 'ytimg.com',
      },
      {
        hostname: 'img.youtube.com',
      },
      {
        hostname: 'pjepbxbphppvmowmbcrf.supabase.co',
      },
    ],
  },
};

export default nextConfig;
