import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "j-d-wedding.s3.ap-southeast-2.amazonaws.com",
      },
    ],
  },
  allowedDevOrigins: ['192.168.0.238'],
  output: "standalone",
  /* config options here */
};

export default nextConfig;
