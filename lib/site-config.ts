// Change SITE_URL once after connecting the final custom domain.
export const SITE_URL = "https://valam-foods-iselin.shd65d9k5s.chatgpt.site";

// GitHub Pages serves this project under /valam-foods-preview during preview builds.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const withBasePath = (path: string) => `${BASE_PATH}${path}`;

// Keep the demo out of search results until the business approves it for launch.
export const INDEXING_ENABLED = false;
