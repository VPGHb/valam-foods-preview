import { NextResponse } from "next/server";
import { ADMIN_COOKIE, generateRecoveryCodes, getCookieValue, verifyAdminSession } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const email = await verifyAdminSession(getCookieValue(request.headers.get("cookie"), ADMIN_COOKIE));
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ codes: await generateRecoveryCodes(email) });
}
