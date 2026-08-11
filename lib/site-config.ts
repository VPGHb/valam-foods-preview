export const SITE_URL = "https://valamfood.com";

// GitHub Pages serves this project under /valam-foods-preview during preview builds.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const withBasePath = (path: string) => `${BASE_PATH}${path}`;

export const INDEXING_ENABLED = true;
