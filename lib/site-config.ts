import { env } from "cloudflare:workers";

export function runtimeValue(name: string) {
  const runtime = env as unknown as Record<string, unknown>;
  const candidate = runtime[name] ?? process.env[name];
  return typeof candidate === "string" ? candidate.trim() : "";
}

export function searchIndexingEnabled() {
  return runtimeValue("PUBLIC_SEARCH_INDEXING").toLowerCase() === "enabled";
}
