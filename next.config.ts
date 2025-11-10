import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '200mb',
    },
    middlewareClientMaxBodySize: '100mb',
  },
};

export default nextConfig;