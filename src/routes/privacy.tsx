import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { EMAIL } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Satvim" },
      { name: "description", content: "Satvim privacy policy (placeholder pending legal review)." },
      { property: "og:title", content: "Privacy Policy — Satvim" },
      { property: "og:description", content: "Satvim privacy policy (placeholder pending legal review)." },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://satvim.com/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy">
      <p>[Placeholder] This section will describe what personal data Satvim collects and why.</p>
      <h2>Information we collect</h2>
      <p>[Placeholder] Details of enquiry form data and any data processed on behalf of clients.</p>
      <h2>How we use information</h2>
      <p>[Placeholder] Purposes of processing and lawful bases, to be confirmed.</p>
      <h2>Your requests</h2>
      <p>
        [Placeholder] To ask about your data, email <a className="text-teal-strong underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalLayout>
  ),
});
