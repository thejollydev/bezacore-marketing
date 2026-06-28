import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What bezacore.com collects and how BezaCore Labs LLC uses it. No cookies, analytics, or tracking.",
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="May 2026">
      <p>
        This policy explains what bezacore.com collects and how we use it. The site is operated by
        BezaCore Labs LLC, based in Petoskey, Michigan. We have kept it short because the site is
        simple: it does not use cookies, analytics, advertising, or third-party tracking of any kind.
      </p>

      <h2>What we collect</h2>
      <p>We only collect information you choose to give us through a form:</p>
      <ul>
        <li>
          <strong>Contact form</strong> — your name, email address, subject, and message.
        </li>
      </ul>
      <p>
        Nothing is collected automatically. There are no cookies, no analytics, no tracking pixels,
        and no advertising identifiers.
      </p>

      <h2>How we use it</h2>
      <p>
        We use contact-form submissions to read and respond to your message. We will not email you
        for any other reason, and we will not share or sell your address.
      </p>

      <h2>How submissions are handled</h2>
      <p>
        Form submissions reach us by email through <a href="https://resend.com" target="_blank" rel="noopener noreferrer">Resend</a>, a
        transactional email provider, and land in a BezaCore Labs inbox. Resend processes each
        message in order to deliver it. We keep these messages as long as needed to respond and to
        maintain ordinary business records.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell, rent, or trade your personal information. We share it only with the email
        provider that delivers it, and only where required by law.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access or delete the information you have given us at any time — reach us
        through the <Link href="/contact">contact form</Link>. If you are a California resident, you have the
        right to know what personal information we hold and to request its deletion; this policy
        describes the full extent of what we collect.
      </p>

      <h2>Children</h2>
      <p>
        The site is not directed to children under 13, and we do not knowingly collect information
        from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise the date above.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Reach us through the <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
