import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("ships the photo-ready public menu", async () => {
  const [page, css] = await Promise.all([read("app/page.tsx"), read("app/globals.css")]);
  assert.match(page, /className="menu-photo"/);
  assert.match(page, /Photo coming soon/);
  assert.match(page, /readMenu\(\)/);
  assert.match(css, /grid-template-columns:\s*repeat\(3/);
  assert.match(css, /grid-template-columns:\s*repeat\(2/);
  assert.match(css, /aspect-ratio:\s*4\s*\/\s*3/);
});

test("protects menu management and stores durable menu data", async () => {
  const [auth, login, menuApi, adminPage, hosting, migration] = await Promise.all([
    read("lib/admin-auth.ts"),
    read("app/api/admin/login/route.ts"),
    read("app/api/admin/menu/route.ts"),
    read("app/admin/page.tsx"),
    read(".openai/hosting.json"),
    read("drizzle/0000_swift_guardian.sql"),
  ]);
  assert.match(auth, /ADMIN_PASSWORD_SHA256/);
  assert.match(auth, /ADMIN_SESSION_SECRET/);
  assert.match(auth, /vrajkp501@gmail\.com/i);
  assert.match(login, /httpOnly:\s*true/);
  assert.match(login, /sameSite:\s*"strict"/);
  assert.match(menuApi, /verifyAdminSession/);
  assert.match(adminPage, /redirect\("\/admin\/login"\)/);
  assert.match(hosting, /"d1":\s*"DB"/);
  assert.match(migration, /CREATE TABLE `menu_items`/);
  assert.doesNotMatch(`${auth}\n${login}`, /ADMIN_PASSWORD\s*=\s*["'][^"']+/);
});

test("includes direct uploads, backups, recovery and launch-controlled SEO", async () => {
  const [hosting, upload, media, backup, recovery, sitemap, robots, layout] = await Promise.all([
    read(".openai/hosting.json"),
    read("app/api/admin/upload/route.ts"),
    read("app/media/[...key]/route.ts"),
    read("app/api/admin/backup/route.ts"),
    read("app/api/admin/recover/route.ts"),
    read("app/sitemap.ts"),
    read("app/robots.ts"),
    read("app/layout.tsx"),
  ]);
  assert.match(hosting, /"r2":\s*"MEDIA"/);
  assert.match(upload, /verifyAdminSession/);
  assert.match(upload, /5 \* 1024 \* 1024/);
  assert.match(upload, /MEDIA\.put/);
  assert.match(media, /x-content-type-options/);
  assert.match(backup, /attachment; filename=/);
  assert.match(backup, /restoreMenu/);
  assert.match(recovery, /resetPasswordWithRecoveryCode/);
  assert.match(sitemap, /changeFrequency:\s*"weekly"/);
  assert.match(robots, /searchIndexingEnabled/);
  assert.match(layout, /GOOGLE_SITE_VERIFICATION/);
  assert.match(layout, /BING_SITE_VERIFICATION/);
});
