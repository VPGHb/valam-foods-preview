import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="status-page">
      <div className="status-shell">
        <Link className="status-brand" href="/" aria-label="VALAM FOODS home">
          <Image src="/valam-foods-logo.png" alt="VALAM FOODS" width={132} height={132} priority />
        </Link>

        <div className="status-content">
          <div className="status-code" aria-hidden="true">
            <strong>404</strong>
          </div>

          <section className="status-copy">
            <p className="eyebrow">Page not found</p>
            <h1>This page left the table.</h1>
            <p>The link may be outdated, but the menu is still fresh.</p>
            <div className="status-actions">
              <Link className="button" href="/">Back home</Link>
              <Link className="status-menu-link" href="/#menu">View the menu <span aria-hidden="true">↗</span></Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
