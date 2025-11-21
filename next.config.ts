import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'choco.com',
      },
      {
        protocol: 'https',
        hostname: 'www.deliveryhero.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gotocompany.com',
      },
    ],
  },
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
