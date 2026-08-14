import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Website Disclaimers | VALAM FOODS",
  description: "Menu, food allergy, review and third-party service disclaimers for the VALAM FOODS website.",
};

export const dynamic = "force-static";

export default function DisclaimerPage() {
  return (
    <LegalShell title="Website Disclaimers" intro="Please read these notices before relying on menu, dietary, review or third-party information shown on this website.">
      <section>
        <h2>Food and allergy information</h2>
        <p>Website descriptions are general information, not medical or nutritional advice. Ingredients and preparation methods can change, and cross-contact may occur. Tell staff about allergies before ordering. We cannot guarantee any item is allergen-free.</p>
      </section>
      <section>
        <h2>Menu and images</h2>
        <p>Menu items, portions, prices, taxes, fees and availability may change. Menu images and illustrations are representative depictions for visual reference and may not exactly match the appearance, ingredients, portion or presentation of the food served. Call the restaurant to confirm current information.</p>
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
