import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const assetPath = (path: string) => `${basePath}${path}`;

export function LegalShell({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <Link href="/" aria-label="Return to VALAM FOODS home">
          <Image src={assetPath("/valam-foods-logo.png")} alt="VALAM FOODS" width={120} height={120} priority />
        </Link>
        <Link className="text-link" href="/">Back to website</Link>
      </header>
      <article className="legal-document">
        <p className="eyebrow">Website information</p>
        <h1>{title}</h1>
        <p className="legal-intro">{intro}</p>
        <p className="legal-date">Last updated August 7, 2026</p>
        {children}
      </article>
      <footer className="legal-footer">
        <strong>Questions?</strong>
        <a href="tel:+12673309984">Call VALAM FOODS at +1 267-330-9984</a>
        <span>224 Correja Ave, Iselin, NJ 08830</span>
      </footer>
    </main>
  );
}
