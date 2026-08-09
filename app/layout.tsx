import type { Metadata } from "next";
import { headers } from "next/headers";
import { Nunito_Sans, Oswald } from "next/font/google";
import { runtimeValue, searchIndexingEnabled } from "@/lib/site-config";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "localhost:5173";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const canIndex = searchIndexingEnabled();
  const googleVerification = runtimeValue("GOOGLE_SITE_VERIFICATION");
  const bingVerification = runtimeValue("BING_SITE_VERIFICATION");

  return {
    metadataBase: new URL(baseUrl),
    title: "VALAM FOODS | Indian Street Food in Iselin, NJ",
    description: "Vegetarian Indian street food, Gujarati favorites, sweets, chai, tiffin and catering at 224 Correja Ave in Iselin, New Jersey.",
    keywords: ["Indian food Iselin NJ", "Gujarati food Iselin", "Indian street food near me", "vegetarian restaurant Iselin", "VALAM FOODS", "pani puri Iselin", "vada pav Iselin"],
    robots: { index: canIndex, follow: canIndex },
    alternates: { canonical: "/" },
    openGraph: {
      title: "VALAM FOODS | Indian Street Food in Iselin",
      description: "Street food, Gujarati favorites, sweets, chai, tiffin and catering in Iselin, NJ.",
      type: "website",
      locale: "en_US",
      url: baseUrl,
      siteName: "VALAM FOODS",
      images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: "VALAM FOODS Indian street food in Iselin, NJ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "VALAM FOODS | Indian Street Food in Iselin",
      description: "Street food, Gujarati favorites, sweets, chai, tiffin and catering in Iselin, NJ.",
      images: [`${baseUrl}/og.png`],
    },
    icons: {
      icon: "/valam-foods-logo.png",
      shortcut: "/valam-foods-logo.png",
      apple: "/valam-foods-logo.png",
    },
    verification: {
      ...(googleVerification ? { google: googleVerification } : {}),
      ...(bingVerification ? { other: { "msvalidate.01": [bingVerification] } } : {}),
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
