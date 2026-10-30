import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";
import { EMAIL } from "@/lib/site-config";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — HarryFlows" },
      { name: "description", content: "HarryFlows privacy policy (placeholder pending legal review)." },
      { property: "og:title", content: "Privacy Policy — HarryFlows" },
      { property: "og:description", content: "HarryFlows privacy policy (placeholder pending legal review)." },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: () => (
    <LegalLayout title="Privacy Policy">
      <p>[Placeholder] This section will describe what personal data HarryFlows collects and why.</p>
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
