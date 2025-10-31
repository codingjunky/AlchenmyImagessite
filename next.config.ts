import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for landing pages
  output: 'export',
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  // Disable ESLint during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;