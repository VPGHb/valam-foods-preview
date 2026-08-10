import type { NextConfig } from "next";

// vinext beta currently omits emitted client assets when assetPrefix is set
// during a static export. The post-build step applies the GitHub Pages prefix
// after all assets have been generated.
const assetPrefix = process.env.VINEXT_ASSET_PREFIX || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  assetPrefix,
};

export default nextConfig;
