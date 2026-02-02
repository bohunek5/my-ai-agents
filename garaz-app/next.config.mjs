/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/my-ai-agents",
    images: {
        unoptimized: true,
    },
    trailingSlash: true, // Optional but good for static export
};

export default nextConfig;
