import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/site/LegalLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms — Satvim" },
      { name: "description", content: "Satvim terms of service (placeholder pending legal review)." },
      { property: "og:title", content: "Terms — Satvim" },
      { property: "og:description", content: "Satvim terms of service (placeholder pending legal review)." },
      { property: "og:type", content: "article" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://satvim.com/terms" }],
  }),
  component: () => (
    <LegalLayout title="Terms of Service">
      <p>[Placeholder] These terms will set out how Satvim provides its services.</p>
      <h2>Services</h2>
      <p>[Placeholder] Scope of setup and monthly retainer services.</p>
      <h2>Fees and third-party costs</h2>
      <p>[Placeholder] Fees are in GBP and exclude applicable taxes. Third-party costs are billed by providers.</p>
      <h2>Termination</h2>
      <p>[Placeholder] Notice periods and access removal, to be confirmed.</p>
    </LegalLayout>
  ),
});
