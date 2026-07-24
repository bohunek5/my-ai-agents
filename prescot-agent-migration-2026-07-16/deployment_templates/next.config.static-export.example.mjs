/** @type {import('next').NextConfig} */
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isGithubPages = process.env.GITHUB_ACTIONS === "true" && repo;

const nextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
