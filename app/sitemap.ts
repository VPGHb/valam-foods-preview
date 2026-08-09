import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:5173";
  const protocol = host.includes("localhost") ? "http" : "https";
  return [{ url: `${protocol}://${host}/`, changeFrequency: "weekly", priority: 1 }];
}
