import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Website Terms | VALAM FOODS",
  description: "Terms for using the VALAM FOODS website.",
};

export const dynamic = "force-static";

export default function TermsPage() {
  return (
    <LegalShell title="Website Terms" intro="These terms apply when you use the VALAM FOODS website. By using the site, you agree to these terms.">
      <section>
        <h2>Website purpose</h2>
        <p>The website provides general information about VALAM FOODS, including menu items, estimated prices, catering, location and contact details. It does not currently accept orders, reservations or payments. Please call to place or confirm an order.</p>
      </section>
      <section>
        <h2>Menu, pricing and availability</h2>
        <p>Menu items, ingredients, portions, prices, taxes, fees, hours and availability may change without notice. Website information may occasionally be incomplete or out of date. Please call the restaurant to confirm current details before purchasing.</p>
      </section>
      <section>
        <h2>Food allergies and dietary needs</h2>
        <p>Ingredients and preparation methods may change, and cross-contact can occur. Tell staff about allergies or dietary restrictions before ordering. No menu item is guaranteed to be free of allergens. Vegetarian items may contain dairy or other animal-derived ingredients unless staff confirms otherwise.</p>
      </section>
      <section>
        <h2>Reviews and third-party links</h2>
        <p>Review excerpts reflect individual customer opinions and do not guarantee a typical experience. Links and embedded content from Google, Instagram and other third parties are provided for convenience. Their services and policies are outside our control.</p>
      </section>
      <section>
        <h2>Website content and responsibility</h2>
        <p>The VALAM FOODS name, logo, artwork, text and website design may not be copied or used commercially without permission. We work to keep the site accurate and available, but cannot promise uninterrupted access or that every item of information is error-free.</p>
      </section>
      <section>
        <h2>Applicable law</h2>
        <p>These terms are governed by applicable United States and New Jersey law. Nothing in these terms limits rights that cannot legally be limited.</p>
      </section>
    </LegalShell>
  );
}
