import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
        protocol: "https",
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https",
      },
      {
        hostname: "mockmind-api.uifaces.co",
        protocol: "https",
      },
      {
        hostname: 'avatars.githubusercontent.com',
        protocol: 'https'
      }
    ],
  },
};

export default nextConfig;
