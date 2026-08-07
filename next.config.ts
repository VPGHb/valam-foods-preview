import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true" || process.env.STATIC_EXPORT === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: isGitHubPages,
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
