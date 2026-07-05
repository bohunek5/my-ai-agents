import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/scharfer",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
