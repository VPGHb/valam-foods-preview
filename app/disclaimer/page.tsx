import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Website Disclaimers | VALAM FOODS",
  description: "Menu, food allergy, review and third-party service disclaimers for the VALAM FOODS website.",
};

export default function DisclaimerPage() {
  return (
    <LegalShell title="Website Disclaimers" intro="Please read these notices before relying on menu, dietary, review or third-party information shown on this website.">
      <section>
        <h2>Demo status</h2>
        <p>This website is currently a demonstration and is not yet the official VALAM FOODS website. Business details, policies and content must be reviewed and approved by VALAM FOODS before public launch.</p>
      </section>
      <section>
        <h2>Food and allergy information</h2>
        <p>Website descriptions are general information, not medical or nutritional advice. Ingredients and preparation methods can change, and cross-contact may occur. Tell staff about allergies before ordering. We cannot guarantee any item is allergen-free.</p>
      </section>
      <section>
        <h2>Menu and images</h2>
        <p>Menu items, portions, prices, taxes, fees and availability may change. Food illustrations are representative and may not exactly match the item served. Call the restaurant to confirm current information.</p>
      </section>
      <section>
        <h2>Customer reviews</h2>
        <p>Review excerpts come from publicly posted Google reviews and may be shortened for space. They reflect individual opinions and experiences. Results and experiences vary.</p>
      </section>
      <section>
        <h2>External services</h2>
        <p>Google Maps, Google Reviews, Instagram and other linked services are operated independently. VALAM FOODS does not control their availability, content, security or privacy practices.</p>
      </section>
    </LegalShell>
  );
}
