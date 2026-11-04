import { createFileRoute } from "@tanstack/react-router";
import {
  Contact, CtaBand, Demo, Faq, Features, Fit, Footer, Header, Hero, HowItWorks, Ownership, Pricing, Problem, Roi,
} from "@/components/site/sections";

const TITLE = "HarryFlows — AI voice screening for UK recruitment agencies";
const DESC =
  "An AI voice agent that calls your new applicants, screens them against your criteria and sends only qualified candidates to your team.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Problem />
        <HowItWorks />
        <Features />
        <Demo />
        <Ownership />
        <Fit />
        <Roi />
        <Pricing />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
