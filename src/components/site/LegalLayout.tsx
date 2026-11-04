import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function LegalLayout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link to="/" aria-label="HarisFlows home">
            <Logo className="h-8" />
          </Link>
          <Link to="/" className="text-sm font-medium text-teal-strong hover:underline">
            Back to home
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-5 py-14">
        <p className="mb-6 rounded-lg border border-dashed border-teal-strong bg-teal-soft px-4 py-3 text-sm text-foreground">
          <strong>Placeholder copy.</strong> This page has not been reviewed by a legal professional and is not legal
          advice. Final wording is pending legal review.
        </p>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <div className="mt-6 space-y-4 text-muted-foreground [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground">
          {children}
        </div>
      </main>
    </div>
  );
}
