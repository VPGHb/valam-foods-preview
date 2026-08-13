export const SITE_URL = "https://valamfood.com";

// GitHub Pages serves its non-indexable fallback copy under this base path.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const withBasePath = (path: string) => `${BASE_PATH}${path}`;

// Only the canonical Cloudflare deployment should be indexed.
export const INDEXING_ENABLED = process.env.NEXT_PUBLIC_DISABLE_INDEXING !== "true";
