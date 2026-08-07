import Image from "next/image";
import type { ReactNode } from "react";

export function LegalShell({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <a href="/" aria-label="Return to VALAM FOODS home">
          <Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={120} height={120} priority />
        </a>
        <a className="text-link" href="/">Back to website</a>
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
