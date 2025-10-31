import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Netlify deployment
  output: 'export',
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
