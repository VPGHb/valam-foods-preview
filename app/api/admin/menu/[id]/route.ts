import { NextResponse } from "next/server";
import { deleteMenuItem, updateMenuItem } from "@/db/menu";
import { ADMIN_COOKIE, getCookieValue, verifyAdminSession } from "@/lib/admin-auth";

async function authorized(request: Request) {
  return verifyAdminSession(getCookieValue(request.headers.get("cookie"), ADMIN_COOKIE));
}

function clean(input: Record<string, unknown>) {
  return {
    categoryId: String(input.categoryId ?? "").trim(),
    name: String(input.name ?? "").trim(),
    description: String(input.description ?? "").trim(),
    detail: String(input.detail ?? "").trim(),
    price: String(input.price ?? "").trim(),
    imageUrl: String(input.imageUrl ?? "").trim(),
    isVisible: input.isVisible !== false,
    sortOrder: Number.isFinite(Number(input.sortOrder)) ? Number(input.sortOrder) : 0,
  };
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await authorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const input = clean(await request.json() as Record<string, unknown>);
  if (!input.categoryId || !input.name || !input.price) return NextResponse.json({ error: "Category, name and price are required." }, { status: 400 });
  await updateMenuItem((await context.params).id, input);
  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await authorized(request))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await deleteMenuItem((await context.params).id);
  return NextResponse.json({ ok: true });
}
