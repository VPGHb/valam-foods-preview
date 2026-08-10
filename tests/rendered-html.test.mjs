import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");
const exists = async (path) => access(new URL(path, root)).then(() => true, () => false);

test("exports a fully static public website", async () => {
  const [config, page, hosting] = await Promise.all([
    read("next.config.ts"),
    read("app/page.tsx"),
    read(".openai/hosting.json"),
  ]);
  assert.match(config, /output:\s*"export"/);
  assert.match(config, /unoptimized:\s*true/);
  assert.doesNotMatch(page, /readMenu|seedMenuIfEmpty|cloudflare:workers/);
  assert.doesNotMatch(hosting, /"d1"|"r2"/);
  assert.equal(await exists("app/admin/page.tsx"), false);
  assert.equal(await exists("app/api/admin/menu/route.ts"), false);
  assert.equal(await exists("db/menu.ts"), false);
});

test("keeps the public menu, responsive imagery and launch controls", async () => {
  const [page, css, siteConfig, robots, sitemap] = await Promise.all([
    read("app/page.tsx"),
    read("app/globals.css"),
    read("lib/site-config.ts"),
    read("public/robots.txt"),
    read("public/sitemap.xml"),
  ]);
  assert.match(page, /className="menu-photo"/);
  assert.match(page, /Photo coming soon/);
  assert.match(page, /4\.6/);
  assert.match(page, /191 reviews/);
  assert.match(css, /grid-template-columns:\s*repeat\(3/);
  assert.match(css, /grid-template-columns:\s*repeat\(2/);
  assert.match(siteConfig, /INDEXING_ENABLED = false/);
  assert.match(robots, /Disallow:\s*\//);
  assert.match(sitemap, /<changefreq>weekly<\/changefreq>/);
});

test("includes all static information pages", async () => {
  for (const path of [
    "app/privacy/page.tsx",
    "app/terms/page.tsx",
    "app/disclaimer/page.tsx",
    "app/accessibility/page.tsx",
    "app/not-found.tsx",
    "app/loading.tsx",
  ]) assert.equal(await exists(path), true, `${path} should exist`);
});
