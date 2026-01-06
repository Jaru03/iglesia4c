import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
    ],
  },
};

export default nextConfig;
