import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { searchIndexingEnabled } from "@/lib/site-config";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:5173";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const canIndex = searchIndexingEnabled();
  return {
    rules: {
      userAgent: "*",
      ...(canIndex ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
