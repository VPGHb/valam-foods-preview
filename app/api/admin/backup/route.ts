import { NextResponse } from "next/server";
import { readMenu, restoreMenu, type MenuCategoryRecord } from "@/db/menu";
import { ADMIN_COOKIE, getCookieValue, verifyAdminSession } from "@/lib/admin-auth";

async function authorized(request: Request) {
  return verifyAdminSession(getCookieValue(request.headers.get("cookie"), ADMIN_COOKIE));
}

function validBackup(value: unknown): value is { version: 1; categories: MenuCategoryRecord[] } {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { version?: unknown; categories?: unknown };
  if (candidate.version !== 1 || !Array.isArray(candidate.categories) || candidate.categories.length > 50) return false;
  const categoryIds = new Set<string>();
  const itemIds = new Set<string>();
  return candidate.categories.every((category) => {
    if (!category || typeof category.id !== "string" || !category.id || category.id.length > 100 || categoryIds.has(category.id)) return false;
    categoryIds.add(category.id);
    if (typeof category.title !== "string" || category.title.length > 120 || typeof category.note !== "string" || category.note.length > 300) return false;
    if (!["green", "orange"].includes(category.tone) || !Number.isFinite(category.sortOrder) || !Array.isArray(category.items) || category.items.length > 500) return false;
    return category.items.every((item: MenuCategoryRecord["items"][number]) => {
      if (!item || typeof item.id !== "string" || !item.id || item.id.length > 100 || itemIds.has(item.id)) return false;
      itemIds.add(item.id);
      return item.categoryId === category.id && typeof item.name === "string" && item.name.length > 0 && item.name.length <= 160 &&
        typeof item.description === "string" && item.description.length <= 1200 && typeof item.detail === "string" && item.detail.length <= 160 &&
        typeof item.price === "string" && item.price.length > 0 && item.price.length <= 160 && typeof item.imageUrl === "string" && item.imageUrl.length <= 1000 &&
        typeof item.isVisible === "boolean" && Number.isFinite(item.sortOrder);
    });
  });
}

export async function GET(request: Request) {
  if (!(await authorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const backup = { version: 1, createdAt: new Date().toISOString(), business: "VALAM FOODS ISELIN NJ", categories: await readMenu(true) };
  return new Response(JSON.stringify(backup, null, 2), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "content-disposition": `attachment; filename="valam-menu-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      "cache-control": "no-store",
    },
  });
}

export async function POST(request: Request) {
  if (!(await authorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("backup");
  if (!(file instanceof File) || file.size > 2 * 1024 * 1024) return NextResponse.json({ error: "Choose a valid backup file under 2 MB." }, { status: 400 });
  let backup: unknown;
  try { backup = JSON.parse(await file.text()); } catch { return NextResponse.json({ error: "The backup file is not valid JSON." }, { status: 400 }); }
  if (!validBackup(backup)) return NextResponse.json({ error: "This is not a valid VALAM FOODS menu backup." }, { status: 400 });
  await restoreMenu(backup.categories);
  return NextResponse.json({ ok: true });
}
