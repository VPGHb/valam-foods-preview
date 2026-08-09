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
