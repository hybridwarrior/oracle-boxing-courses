import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.oracleboxing.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
