import { env } from "cloudflare:workers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, getCookieValue, verifyAdminSession } from "@/lib/admin-auth";

const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

async function fileMatchesType(file: File) {
  const bytes = new Uint8Array(await file.slice(0, 16).arrayBuffer());
  const text = String.fromCharCode(...bytes);
  if (file.type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (file.type === "image/png") return bytes.slice(0, 8).every((byte, index) => byte === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index]);
  if (file.type === "image/webp") return text.slice(0, 4) === "RIFF" && text.slice(8, 12) === "WEBP";
  if (file.type === "image/avif") return text.slice(4, 8) === "ftyp" && ["avif", "avis"].includes(text.slice(8, 12));
  return false;
}

export async function POST(request: Request) {
  const email = await verifyAdminSession(getCookieValue(request.headers.get("cookie"), ADMIN_COOKIE));
  if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await request.formData();
  const file = form.get("photo");
  if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  const extension = allowedTypes.get(file.type);
  if (!extension) return NextResponse.json({ error: "Use a JPG, PNG, WebP or AVIF image." }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });
  if (!(await fileMatchesType(file))) return NextResponse.json({ error: "The file contents do not match a supported image format." }, { status: 400 });

  const runtime = env as unknown as { MEDIA?: R2Bucket };
  if (!runtime.MEDIA) return NextResponse.json({ error: "Image storage is not configured." }, { status: 503 });
  const key = `menu/${Date.now()}-${crypto.randomUUID()}.${extension}`;
  await runtime.MEDIA.put(key, file.stream(), {
    httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" },
    customMetadata: { uploadedBy: email },
  });
  return NextResponse.json({ url: `/media/${key}` }, { status: 201 });
}
