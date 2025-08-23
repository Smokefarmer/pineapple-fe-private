import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /pino-pretty/ },
    ];
    return config;
  },
};

export default nextConfig;
