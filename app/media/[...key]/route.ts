import { env } from "cloudflare:workers";

export async function GET(_request: Request, context: { params: Promise<{ key: string[] }> }) {
  const keyParts = (await context.params).key;
  const key = keyParts.join("/");
  if (!key.startsWith("menu/") || key.includes("..")) return new Response("Not found", { status: 404 });
  const runtime = env as unknown as { MEDIA?: R2Bucket };
  const object = await runtime.MEDIA?.get(key);
  if (!object) return new Response("Not found", { status: 404 });
  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set("etag", object.httpEtag);
  headers.set("cache-control", "public, max-age=31536000, immutable");
  headers.set("x-content-type-options", "nosniff");
  return new Response(object.body, { headers });
}
