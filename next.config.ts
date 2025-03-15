import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.discordapp.net",
      },
    ],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  output: "standalone",
};

export default nextConfig;
