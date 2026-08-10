import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
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

test("gives every menu item an illustrated placeholder and keeps launch controls", async () => {
  const [page, layout, css, siteConfig, robots, sitemap, llms] = await Promise.all([
    read("app/page.tsx"),
    read("app/layout.tsx"),
    read("app/globals.css"),
    read("lib/site-config.ts"),
    read("public/robots.txt"),
    read("public/sitemap.xml"),
    read("public/llms.txt"),
  ]);
  assert.match(page, /className="menu-photo"/);
  assert.match(page, /menuIllustrationFor/);
  assert.match(page, /Illustrated preview/);
  assert.match(page, /\/menu-items\//);
  assert.doesNotMatch(page, /menuArtFor/);
  assert.doesNotMatch(page, /Description demo/);
  assert.match(page, /4\.6/);
  assert.match(page, /191 reviews/);
  assert.match(page, /"@type": "FAQPage"/);
  assert.match(page, /"@type": "MenuItem"/);
  assert.match(page, /areaServed/);
  assert.match(page, /Edison/);
  assert.match(page, /Woodbridge/);
  assert.match(page, /Anil Kumar Moka/);
  assert.match(page, /Kaumudi Alur/);
  assert.match(layout, /Indian Restaurant, Sweets & Snacks in Iselin, NJ/);
  assert.doesNotMatch(layout, /keywords:/);
  assert.match(llms, /Gujarati snacks/);
  assert.match(llms, /224 Correja Ave/);
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

test("ships the complete illustrated menu asset set", async () => {
  const page = await read("app/page.tsx");
  const menuBlock = page.slice(page.indexOf("const menuSections"), page.indexOf("const restaurantSchema"));
  const names = [...menuBlock.matchAll(/\{\s*name:\s*"([^"]+)"/g)].map((match) => match[1]);
  const descriptions = [...menuBlock.matchAll(/description:\s*"([^"]+)"/g)].map((match) => match[1]);
  const slugs = names.map((name) => name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
  const files = (await readdir(new URL("public/menu-items/", root))).filter((file) => file.endsWith(".jpg"));

  assert.equal(names.length, 59);
  assert.equal(descriptions.length, names.length, "every menu item should have a description");
  assert.equal(new Set(slugs).size, names.length, "every menu item should map to a unique illustration");
  assert.equal(files.length, names.length, "there should be exactly one illustration per menu item");
  for (const slug of slugs) assert.equal(await exists(`public/menu-items/${slug}.jpg`), true, `${slug}.jpg should exist`);
});
