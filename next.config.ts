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
    ],
  },
};

export default nextConfig;
