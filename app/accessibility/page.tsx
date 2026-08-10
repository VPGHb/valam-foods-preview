import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Accessibility | VALAM FOODS",
  description: "Accessibility commitment and support information for the VALAM FOODS website.",
};

export const dynamic = "force-static";

export default function AccessibilityPage() {
  return (
    <LegalShell title="Accessibility" intro="VALAM FOODS wants every visitor to be able to use this website and obtain restaurant information.">
      <section>
        <h2>Our approach</h2>
        <p>We aim to provide clear headings, meaningful link text, keyboard access, visible focus indicators, image descriptions, readable color contrast and support for reduced-motion preferences. We continue to improve the experience as the website changes.</p>
      </section>
      <section>
        <h2>Need help?</h2>
        <p>If you have difficulty using any part of the website, call +1 267-330-9984. Please describe the page, the information you need and the problem you encountered. We will make a reasonable effort to provide the information in another format.</p>
      </section>
      <section>
        <h2>Feedback</h2>
        <p>Accessibility feedback is welcome. Calling the restaurant is currently the fastest way to report a barrier or request menu, location or ordering assistance.</p>
      </section>
    </LegalShell>
  );
}
