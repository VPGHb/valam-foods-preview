import { NextResponse } from "next/server";
import { resetPasswordWithRecoveryCode } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const code = String(form.get("code") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const confirmed = String(form.get("confirmPassword") ?? "");
  if (password !== confirmed || password.length < 12) return NextResponse.redirect(new URL("/admin/recover?error=password", request.url), 303);
  const recovered = await resetPasswordWithRecoveryCode(email, code, password);
  return NextResponse.redirect(new URL(recovered ? "/admin/login?reset=1" : "/admin/recover?error=code", request.url), 303);
}
