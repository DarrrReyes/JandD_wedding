import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.0.124'],
  output: "standalone",
  /* config options here */
};

export default nextConfig;
