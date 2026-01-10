import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.ekapak.ru",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
