import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
  },

  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Strict mode for better error handling
  reactStrictMode: true,

  // Disable x-powered-by header
  poweredByHeader: false,

  // Performance budgets (enforced during build)
  experimental: {
    optimizePackageImports: ['recharts'],
  },
};

export default nextConfig;
