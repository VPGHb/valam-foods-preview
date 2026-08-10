import type { Metadata } from "next";
import { Nunito_Sans, Oswald } from "next/font/google";
import { INDEXING_ENABLED, SITE_URL } from "@/lib/site-config";
import "./globals.css";

const nunito = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "VALAM FOODS | Indian Restaurant, Sweets & Snacks in Iselin, NJ",
    description: "Visit VALAM FOODS in Iselin, NJ for vegetarian Indian food, Gujarati snacks, traditional sweets, street food, tiffin, chai and catering near Edison and Woodbridge.",
    applicationName: "VALAM FOODS",
    robots: { index: INDEXING_ENABLED, follow: INDEXING_ENABLED },
    alternates: { canonical: "/" },
    openGraph: {
      title: "VALAM FOODS | Indian Restaurant, Sweets & Snacks in Iselin, NJ",
      description: "Vegetarian Indian food, Gujarati snacks, traditional sweets, street food, tiffin and chai in Iselin near Edison and Woodbridge.",
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: "VALAM FOODS",
      images: [{ url: `${SITE_URL}/og.png`, width: 1200, height: 630, alt: "VALAM FOODS Indian street food in Iselin, NJ" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "VALAM FOODS | Indian Restaurant, Sweets & Snacks in Iselin, NJ",
      description: "Vegetarian Indian food, Gujarati snacks, traditional sweets, street food, tiffin and chai in Iselin near Edison and Woodbridge.",
      images: [`${SITE_URL}/og.png`],
    },
    icons: {
      icon: "/valam-foods-logo.png",
      shortcut: "/valam-foods-logo.png",
      apple: "/valam-foods-logo.png",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${nunito.variable} ${oswald.variable}`}>{children}</body>
    </html>
  );
}
