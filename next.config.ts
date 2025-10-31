import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;