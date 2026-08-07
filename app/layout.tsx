import type { Metadata } from "next";
import { Nunito_Sans, Oswald } from "next/font/google";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const assetUrl = (path: string) => `${siteUrl}${path}`;

export const metadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: "VALAM FOODS | Indian Street Food in Iselin, NJ",
  description: "Vegetarian Indian street food, Gujarati favorites, sweets, chai, tiffin and catering at 224 Correja Ave in Iselin, New Jersey.",
  keywords: ["Indian food Iselin NJ", "Gujarati food Iselin", "Indian street food near me", "vegetarian restaurant Iselin", "VALAM FOODS", "pani puri Iselin", "vada pav Iselin"],
  robots: { index: false, follow: false },
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "VALAM FOODS | Indian Street Food in Iselin",
    description: "Street food, Gujarati favorites, sweets, chai, tiffin and catering in Iselin, NJ.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "VALAM FOODS",
    images: [{ url: assetUrl("/og.png"), width: 1200, height: 630, alt: "VALAM FOODS Indian street food in Iselin, NJ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VALAM FOODS | Indian Street Food in Iselin",
    description: "Street food, Gujarati favorites, sweets, chai, tiffin and catering in Iselin, NJ.",
    images: [assetUrl("/og.png")],
  },
  icons: {
    icon: assetUrl("/valam-foods-logo.png"),
    shortcut: assetUrl("/valam-foods-logo.png"),
    apple: assetUrl("/valam-foods-logo.png"),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
