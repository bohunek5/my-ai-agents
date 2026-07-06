import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/scharfer",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
