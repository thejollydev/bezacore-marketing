import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern use of bezacore.com, the marketing site of BezaCore Labs LLC.",
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="May 2026">
      <p>
        These terms govern your use of bezacore.com, the marketing site operated by BezaCore Labs
        LLC, a limited liability company based in Petoskey, Michigan. By using the site, you agree to
        them. If you do not agree, please do not use the site.
      </p>

      <h2>The site</h2>
      <p>
        bezacore.com is an informational marketing site for BezaCore Labs and its products. It
        describes who we are and what we are building. It does not itself provide a software product
        or service; our products carry their own terms, presented when those products become
        available.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree to use the site lawfully, and not to disrupt or attempt to compromise it, access it
        through automated means that place an unreasonable load on it, or use any contact or waitlist
        form to send unlawful, abusive, or deceptive content.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, design, logos, and brand assets on this site are owned by BezaCore Labs LLC
        unless otherwise noted. Please do not reuse our brand assets without permission. Links to the
        site are welcome.
      </p>

      <h2>No warranty</h2>
      <p>
        The site is provided as-is, without warranties of any kind, express or implied. We work to
        keep it accurate and current, but do not guarantee that it is complete or error-free. Product
        descriptions reflect work in progress and may change.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, BezaCore Labs LLC is not liable for any indirect,
        incidental, or consequential damages arising from your use of the site.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. When we do, we will revise the date above.
        Continued use of the site after a change means you accept the revised terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Michigan, United States, without regard
        to its conflict-of-law principles.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Reach us through the <Link href="/contact">contact form</Link>.
      </p>
    </LegalPage>
  );
}
