import type { Metadata } from "next";
import { LegalShell } from "../legal-shell";

export const metadata: Metadata = {
  title: "Privacy Policy | VALAM FOODS",
  description: "Privacy information for the VALAM FOODS website.",
};

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" intro="This policy explains how the VALAM FOODS website handles information when you visit it.">
      <section>
        <h2>Information this website handles</h2>
        <p>This website does not currently offer accounts, web ordering, payment processing, email signups or contact forms. You do not need to provide personal information to browse the menu.</p>
        <p>Our hosting and security providers may automatically process basic technical information such as an IP address, browser type, device information, requested pages and timestamps. This information is used to deliver, secure and maintain the website.</p>
      </section>
      <section>
        <h2>Cookies and third-party services</h2>
        <p>We do not intentionally use advertising or analytics cookies on this website. The embedded Google Map and links to Google Maps, Google Reviews and Instagram are operated by third parties. Those services may collect information under their own privacy policies when you load or visit them.</p>
      </section>
      <section>
        <h2>How information is used and shared</h2>
        <p>Technical information may be used for website delivery, security, troubleshooting and fraud prevention. We do not sell personal information collected through this website. Service providers may process limited information only as needed to operate the website or as required by law.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You may control third-party cookies through your browser settings. Where applicable law provides privacy rights, you may call us to ask about access, correction or deletion of information associated with your website visit.</p>
      </section>
      <section>
        <h2>Children and policy changes</h2>
        <p>This website is not directed to children under 13, and we do not knowingly collect personal information from children through it. We may update this policy when the website or our practices change.</p>
      </section>
    </LegalShell>
  );
}
