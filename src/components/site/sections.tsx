import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Bell, BarChart3, CalendarCheck, Check, CheckCircle2, ClipboardList, Clock, FileQuestion,
  Headphones, Linkedin, Mail, Menu, MessageSquareText, Mic, Phone, PhoneCall, PhoneOff, Play, RefreshCw,
  ShieldCheck, Sparkles, UserPlus, Users, XCircle, KeyRound, Database, Hourglass,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { AnimatedNumber, FlowDiagram } from "./motion";
import {
  CALENDLY_URL, DEMO_AUDIO_URL, DEMO_VIDEO_URL, EMAIL, LINKEDIN_URL, LOCATION, PHONE_DISPLAY, PHONE_TEL,
  calcRoi, gbp, isPlaceholder,
} from "@/lib/site-config";

const NAV = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#demo", label: "Demo" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

// Until {{CALENDLY_URL}} is replaced, demo buttons fall back to the contact section.
const demoHref = isPlaceholder(CALENDLY_URL) ? "#contact" : CALENDLY_URL;
const demoExternal = !isPlaceholder(CALENDLY_URL);

function DemoButton({ variant = "accent" as const, className = "" }: { variant?: "accent" | "default"; className?: string }) {
  return (
    <Button asChild size="lg" variant={variant} className={className}>
      <a href={demoHref} data-placeholder={isPlaceholder(CALENDLY_URL) ? "{{CALENDLY_URL}}" : undefined}
        {...(demoExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <CalendarCheck /> Book a demo
      </a>
    </Button>
  );
}

function SectionHead({ eyebrow, title, intro, light }: { eyebrow: string; title: string; intro?: ReactNode; light?: boolean }) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className={`text-sm font-semibold uppercase tracking-widest ${light ? "text-teal" : "text-teal-strong"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl ${light ? "text-on-navy" : ""}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg ${light ? "text-on-navy-muted" : "text-muted-foreground"}`}>{intro}</p>}
    </Reveal>
  );
}

/* ---------------- Header ---------------- */
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="on-navy sticky top-0 z-50 border-b border-on-navy/10 bg-navy/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <a href="#top" aria-label="Satvim home" className="shrink-0">
          <span className="flex flex-col leading-none">
            <Logo reversed className="text-2xl" />
            <span className="mt-1 hidden text-[10px] font-medium tracking-wide text-on-navy-muted sm:block">AI Automation for Recruitment Agencies</span>
          </span>
        </a>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-sm font-medium text-on-navy-muted transition-colors hover:text-on-navy">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden sm:block"><DemoButton className="h-10 text-sm" /></div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="onNavy" size="icon" className="md:hidden" aria-label="Open menu"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <nav aria-label="Mobile" className="mt-10">
                <ul className="space-y-1">
                  {NAV.map((n) => (
                    <li key={n.href}>
                      <a href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 text-base font-medium hover:bg-muted">{n.label}</a>
                    </li>
                  ))}
                  <li className="pt-4" onClick={() => setOpen(false)}><DemoButton className="w-full" /></li>
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */
const CALL_LINES = [
  { ai: true, at: "00:04", text: "Hi Sam, I'm Terry, an AI assistant calling about your application. This call is recorded and transcribed. Is now a good time?" },
  { ai: false, at: "00:12", text: "Yes, that's fine." },
  { ai: true, at: "00:19", text: "Great. How many years of experience do you have in logistics?" },
  { ai: false, at: "00:27", text: "About five years, mostly warehouse supervision." },
  { ai: true, at: "00:36", text: "Thanks. And what's your current notice period?" },
  { ai: false, at: "00:45", text: "Four weeks, and I'd prefer hybrid." },
  { ai: true, at: "00:58", text: "Lovely, thank you. The team will be in touch if it looks like a good fit." },
];
// Chips and the message count at which each appears.
const CALL_CHIPS = [{ label: "5 yrs", after: 4 }, { label: "Logistics", after: 4 }, { label: "4 wks notice", after: 6 }, { label: "Hybrid", after: 6 }];
const speakMs = (t: string) => Math.min(4000, Math.max(1500, t.length * 60));
// Fixed pseudo-random amplitudes/durations so SSR and client match.
const WAVE_BARS = Array.from({ length: 28 }, (_, i) => ({
  amp: 0.35 + ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1 * 0.65,
  dur: 0.45 + ((i * 7) % 5) * 0.08,
  delay: -((i * 37) % 11) * 0.06,
}));
function WaveRow({ label, active, paused, tone }: { label: string; active: boolean; paused: boolean; tone: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-20 shrink-0">
        <p className="text-[11px] font-semibold leading-tight">{label}</p>
        <p className="text-[10px] leading-tight text-muted-foreground">{active ? "Speaking" : "Listening"}</p>
      </div>
      <div className="wave flex h-6 flex-1 items-center justify-between gap-[3px]" data-active={active} data-paused={paused}>
        {WAVE_BARS.map((b, i) => (
          <span key={i} className={`wave-bar h-full w-[3px] rounded-full ${tone} ${i >= 16 ? "hidden sm:block" : ""}`}
            style={{ ["--amp" as string]: b.amp, ["--dur" as string]: `${b.dur}s`, ["--delay" as string]: `${b.delay}s` }} />
        ))}
      </div>
    </div>
  );
}
type CallStep = { connected: boolean; count: number; typing: boolean; fading?: boolean; ms: number };
const CALL_STEPS: CallStep[] = (() => {
  const s: CallStep[] = [{ connected: false, count: 0, typing: false, ms: 1500 }];
  CALL_LINES.forEach((_, i) => {
    s.push({ connected: true, count: i, typing: true, ms: 1000 });
    const speak = speakMs(CALL_LINES[i]!.text);
    s.push({ connected: true, count: i + 1, typing: false, ms: speak + (i === CALL_LINES.length - 1 ? 4000 : 600) });
  });
  s.push({ connected: true, count: CALL_LINES.length, typing: false, fading: true, ms: 500 });
  return s;
})();
const FINAL_STEP = CALL_STEPS.length - 2;

function CallMockup() {
  const rootRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => { setReduced(mq.matches); if (mq.matches) setStep(FINAL_STEP); };
    apply();
    mq.addEventListener("change", apply);
    const el = rootRef.current;
    let io: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(([e]) => setVisible(!!e?.isIntersecting));
      io.observe(el);
    }
    const onVis = () => setTabHidden(document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => { mq.removeEventListener("change", apply); io?.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  useEffect(() => {
    if (reduced || !visible || tabHidden) return;
    const t = window.setTimeout(() => setStep((s) => (s + 1) % CALL_STEPS.length), (CALL_STEPS[step]?.ms ?? 1000));
    return () => window.clearTimeout(t);
  }, [step, visible, reduced, tabHidden]);

  const cur = CALL_STEPS[step] ?? CALL_STEPS[0]!;
  // Speaking window starts when a message appears; synced to the step timeline.
  useEffect(() => {
    const s = CALL_STEPS[step];
    if (reduced || !s || s.typing || s.fading || s.count === 0) { setSpeaking(false); return; }
    setSpeaking(true);
    const t = window.setTimeout(() => setSpeaking(false), speakMs(CALL_LINES[s.count - 1]!.text));
    return () => window.clearTimeout(t);
  }, [step, reduced]);
  const speaker = speaking ? CALL_LINES[cur.count - 1] : undefined;
  const wavePaused = !visible || tabHidden;
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight; // scrolls inside the card only
  }, [cur.count, cur.typing]);

  const ended = cur.count === CALL_LINES.length;
  const status = !cur.connected ? "Calling..." : ended ? "Call ended" : "Screening call in progress";
  const timer = cur.count ? (CALL_LINES[cur.count - 1]?.at ?? "00:00") : "00:00";
  const nextAi = CALL_LINES[cur.count]?.ai ?? true;
  const anim = reduced ? "" : "animate-in fade-in slide-in-from-bottom-2 duration-500";

  return (
    <figure ref={rootRef} className="relative mx-auto w-full max-w-md" aria-label="Illustrative example of an AI screening call">
      <div className="rounded-2xl border border-on-navy/10 bg-card p-5 text-card-foreground shadow-lift">
        <div className="flex items-center justify-between gap-3 border-b pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-teal-soft text-teal-strong"><PhoneCall className={`h-5 w-5 ${!cur.connected && !reduced ? "animate-pulse" : ""}`} aria-hidden /></span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold" aria-live="off">{status}</p>
              <p className="text-xs text-muted-foreground">Warehouse Supervisor role · <span className="tabular-nums">{timer}</span></p>
            </div>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-medium text-teal-strong">
            <span className="h-2 w-2 rounded-full bg-teal-strong motion-safe:animate-pulse" aria-hidden /> Example
          </span>
        </div>
        <div aria-hidden className="mt-4 flex h-[84px] flex-col justify-center gap-2 rounded-xl border bg-secondary px-3 py-2.5">
          <WaveRow label="Terry (AI)" active={!!speaker?.ai} paused={wavePaused} tone="bg-teal-strong" />
          <WaveRow label="Candidate" active={!!speaker && !speaker.ai} paused={wavePaused} tone="bg-navy-soft" />
        </div>
        <div className={`transition-opacity duration-500 ${cur.fading ? "opacity-0" : "opacity-100"}`}>
          <div ref={listRef} className="mt-4 h-72 overflow-hidden">
            <ol className="space-y-3">
              {CALL_LINES.slice(0, cur.count).map((l, i) => (
                <li key={i} className={`flex ${l.ai ? "" : "justify-end"} ${anim}`}>
                  <div className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm ${l.ai ? "bg-muted" : "bg-navy text-on-navy"}`}>
                    <p className={`text-[11px] font-semibold ${l.ai ? "text-teal-strong" : "text-on-navy-muted"}`}>{l.ai ? "Terry, AI assistant" : "Candidate"}</p>
                    <p className="mt-0.5">{l.text}</p>
                  </div>
                </li>
              ))}
              {cur.typing && (
                <li className={`flex ${nextAi ? "" : "justify-end"} ${anim}`} aria-hidden>
                  <div className={`flex gap-1 rounded-xl px-3.5 py-3 ${nextAi ? "bg-muted" : "bg-navy"}`}>
                    {[0, 150, 300].map((d) => (
                      <span key={d} className={`h-1.5 w-1.5 rounded-full animate-bounce ${nextAi ? "bg-muted-foreground" : "bg-on-navy-muted"}`} style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </li>
              )}
            </ol>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-xl border bg-secondary px-4 py-3">
            <div className="text-xs text-muted-foreground">
              {CALL_CHIPS.map((c, i) => (
                <span key={c.label} className={`${reduced ? "" : "transition-opacity duration-500"} ${cur.count >= c.after ? "opacity-100" : "opacity-0"}`}>
                  {i > 0 && " · "}{c.label}
                </span>
              ))}
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full bg-success px-2.5 py-1 text-xs font-semibold text-primary-foreground ${reduced ? "" : "transition-opacity duration-500"} ${ended ? "opacity-100" : "opacity-0"}`}>
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden /> Qualified
            </span>
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-on-navy-muted">Illustrative example only. Not a real candidate or customer call.</figcaption>
    </figure>
  );
}

export function Hero() {
  return (
    <section id="top" className="on-navy bg-hero relative overflow-hidden">
      <div className="bg-grid absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_1fr] lg:py-28">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-on-navy/15 px-3 py-1 text-xs font-medium text-on-navy-muted">
            <Sparkles className="h-3.5 w-3.5 text-teal" aria-hidden /> AI voice screening for recruitment agencies
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-on-navy sm:text-5xl lg:text-6xl">
            Qualify every candidate in <span className="text-teal">minutes</span>, not days.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-on-navy-muted">
            Satvim gives UK recruitment agencies an AI voice agent that calls new applicants, screens them against your criteria and sends only the qualified ones to your team.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <DemoButton />
            <Button asChild size="lg" variant="onNavy">
              <a href="#how-it-works">See how it works <ArrowRight /></a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-on-navy-muted">Built for founder-led recruitment agencies in the UK.</p>
        </Reveal>
        <Reveal delay={150}><CallMockup /></Reveal>
      </div>
    </section>
  );
}

/* ---------------- Problem ---------------- */
export function Problem() {
  const items = [
    { icon: Hourglass, title: "Hours lost on first-round screening calls", text: "Recruiters repeat the same basic questions on call after call, time that could go on clients and placements." },
    { icon: Clock, title: "Strong candidates go cold while they wait for a call back", text: "When applications pile up, the best applicants can move on before anyone reaches them." },
    { icon: ClipboardList, title: "Inconsistent notes and no clear record of who qualified", text: "Different recruiters capture different details, making it harder to compare and prioritise." },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="The problem" title="First-round screening slows good agencies down" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 80}>
              <article className="h-full rounded-2xl border bg-card p-6 shadow-soft">
                <it.icon className="h-6 w-6 text-teal-strong" aria-hidden />
                <h3 className="mt-4 text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-muted-foreground">{it.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- How it works ---------------- */
export function HowItWorks() {
  const steps = [
    { icon: UserPlus, title: "Candidate applies", text: "Your intake form captures candidate details." },
    { icon: PhoneCall, title: "AI calls them", text: "The voice agent phones the candidate, introduces itself as AI, and asks your screening questions one at a time in natural British English." },
    { icon: CheckCircle2, title: "Instant qualification", text: "Experience, field, notice period and work preference are compared with your criteria." },
    { icon: Bell, title: "You get the shortlist", text: "Results are saved to your database, and a Slack alert tells your team who to speak to first." },
  ];
  return (
    <section id="how-it-works" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="How it works" title="From application to shortlist, automatically"
          intro="We qualify the candidates you already have. Satvim does not find or generate candidates." />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 150} className="relative h-full">
                {i < steps.length - 1 && (
                  <span aria-hidden className="step-line absolute left-full top-1/2 z-0 hidden h-0.5 w-5 bg-teal-strong lg:block" style={{ transitionDelay: `${i * 150 + 300}ms` }} />
                )}
                <div className="relative h-full rounded-2xl border bg-card p-6 shadow-soft">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-teal"><s.icon className="h-5 w-5" aria-hidden /></span>
                    <span className="text-3xl font-extrabold text-border" aria-hidden>0{i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
                  <p className="mt-2 text-muted-foreground">{s.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <Reveal><FlowDiagram /></Reveal>
      </div>
    </section>
  );
}

/* ---------------- Features ---------------- */
export function Features() {
  const f = [
    { icon: Mic, text: "Natural AI voice calls in British English, with the agent disclosing that it is AI." },
    { icon: FileQuestion, text: "Custom screening questions and qualification criteria." },
    { icon: RefreshCw, text: "Automatic retry logic for unanswered calls, including attempt count, last attempt time and call status." },
    { icon: PhoneOff, text: "Do-not-call and stop-contact handling." },
    { icon: Database, text: "Structured results saved automatically, including years of experience, field of work and qualified yes/no." },
    { icon: Bell, text: "Live team alerts in Slack." },
    { icon: Mail, text: "Automated candidate outreach emails with your booking link." },
    { icon: BarChart3, text: "Reporting in Google Sheets and Airtable." },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="What you get" title="Everything you need to screen at scale" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {f.map((x, i) => (
            <li key={i}>
              <Reveal delay={(i % 4) * 60} className="h-full">
                <div className="h-full rounded-2xl border bg-card p-5 transition-shadow hover:shadow-soft">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-teal-soft text-teal-strong"><x.icon className="h-5 w-5" aria-hidden /></span>
                  <p className="mt-4 text-[15px] font-medium leading-relaxed">{x.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Demo ---------------- */
function PlaceholderPanel({ icon: Icon, label, token, note }: { icon: typeof Play; label: string; token: string; note: string }) {
  return (
    <div className="grid aspect-video place-items-center rounded-xl border border-dashed border-on-navy/25 bg-navy-deep p-6 text-center" data-placeholder={token}>
      <div>
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/15 text-teal"><Icon className="h-6 w-6" aria-hidden /></span>
        <p className="mt-4 font-semibold text-on-navy">{label}</p>
        <p className="mt-1 text-sm text-on-navy-muted">{note}</p>
      </div>
    </div>
  );
}

export function Demo() {
  return (
    <section id="demo" className="on-navy bg-navy py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead light eyebrow="See it live · Demonstration" title="See the agent in action"
          intro="A demonstration of the workflow and voice agent." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-on-navy/10 bg-navy-soft p-5">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-on-navy"><Play className="h-5 w-5 text-teal" aria-hidden /> Watch the 90-second walkthrough</h3>
              {isPlaceholder(DEMO_VIDEO_URL) ? (
                <PlaceholderPanel icon={Play} label="Walkthrough video coming soon" token="{{DEMO_VIDEO_URL}}" note="The demo video will appear here." />
              ) : (
                <div className="aspect-video overflow-hidden rounded-xl">
                  <iframe src={DEMO_VIDEO_URL} title="Satvim 90-second walkthrough" className="h-full w-full" allow="fullscreen; picture-in-picture" loading="lazy" />
                </div>
              )}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-2xl border border-on-navy/10 bg-navy-soft p-5">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-on-navy"><Headphones className="h-5 w-5 text-teal" aria-hidden /> Hear a real call with our voice agent</h3>
              {isPlaceholder(DEMO_AUDIO_URL) ? (
                <PlaceholderPanel icon={Headphones} label="Audio clip coming soon" token="{{DEMO_AUDIO_URL}}" note="A 10–20 second call clip will appear here." />
              ) : (
                <div className="grid aspect-video place-items-center rounded-xl bg-navy-deep p-6">
                  <audio controls preload="none" src={DEMO_AUDIO_URL} className="w-full">Your browser does not support audio playback.</audio>
                </div>
              )}
            </div>
          </Reveal>
        </div>
        <p className="mt-6 text-center text-sm text-on-navy-muted">Demo calls use our own test data.</p>
      </div>
    </section>
  );
}

/* ---------------- Ownership ---------------- */
export function Ownership() {
  const pts = [
    { icon: KeyRound, text: "You create and own your Make.com, Vapi and Airtable accounts." },
    { icon: Users, text: "We work inside those accounts as a team member." },
    { icon: ShieldCheck, text: "You can remove our access at any time." },
    { icon: MessageSquareText, text: "Third-party tool costs are billed directly by those providers, with no hidden mark-ups." },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-strong">You own everything</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Your accounts. Your data. No lock-in.</h2>
          <p className="mt-4 text-lg text-muted-foreground">Telephony and call-minute costs are paid directly to the providers.</p>
        </Reveal>
        <ul className="grid gap-4 sm:grid-cols-2">
          {pts.map((p, i) => (
            <li key={i}>
              <Reveal delay={i * 70} className="h-full">
                <div className="h-full rounded-2xl border bg-card p-5 shadow-soft">
                  <p.icon className="h-5 w-5 text-teal-strong" aria-hidden />
                  <p className="mt-3 font-medium">{p.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- Who it's for ---------------- */
export function Fit() {
  return (
    <section className="bg-secondary py-20 sm:py-24">
      <div className="mx-auto grid max-w-5xl gap-5 px-5 md:grid-cols-2">
        <Reveal className="h-full">
          <div className="h-full rounded-2xl border bg-card p-7 shadow-soft">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold"><Check className="h-6 w-6 text-success" aria-hidden /> Who it's for</h2>
            <p className="mt-4 text-muted-foreground">Founder-led and small-to-mid-sized UK recruitment and staffing agencies with steady candidate volume, who want faster, more consistent first-round screening.</p>
          </div>
        </Reveal>
        <Reveal delay={100} className="h-full">
          <div className="h-full rounded-2xl border-2 border-destructive/30 bg-card p-7">
            <h2 className="flex items-center gap-2 text-2xl font-extrabold"><XCircle className="h-6 w-6 text-destructive" aria-hidden /> Not a fit if</h2>
            <p className="mt-4 text-muted-foreground">You're looking for lead generation or ad-driven candidate sourcing. Satvim qualifies existing candidates only.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- ROI ---------------- */
export function Roi() {
  const [v, setV] = useState({ c: "", m: "", h: "" });
  const r = calcRoi(Number(v.c), Number(v.m), Number(v.h));
  const fields = [
    { k: "c" as const, label: "Candidates screened per month", step: "1" },
    { k: "m" as const, label: "Average minutes per screening call", step: "1" },
    { k: "h" as const, label: "Recruiter hourly cost (£)", step: "0.01" },
  ];
  return (
    <section id="roi" className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHead eyebrow="ROI estimator" title="Estimate the time you could save" />
        <Reveal className="mt-10">
          <div className="grid gap-8 rounded-2xl border bg-card p-6 shadow-soft sm:p-8 md:grid-cols-[1fr_1fr]">
            <div className="space-y-5">
              {fields.map((f) => (
                <div key={f.k}>
                  <Label htmlFor={`roi-${f.k}`}>{f.label}</Label>
                  <Input id={`roi-${f.k}`} type="number" inputMode="decimal" min="0" step={f.step} value={v[f.k]}
                    onChange={(e) => setV({ ...v, [f.k]: e.target.value })} className="mt-2 h-11" />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-navy p-6 text-on-navy" aria-live="polite">
              {r ? (
                <dl className="space-y-5">
                  <div><dt className="text-sm text-on-navy-muted">Estimated hours saved per month</dt><dd className="text-4xl font-extrabold text-teal"><AnimatedNumber value={r.hours} format={(n) => n.toLocaleString("en-GB", { maximumFractionDigits: 1 })} /></dd></div>
                  <div><dt className="text-sm text-on-navy-muted">Estimated cost saved per month</dt><dd className="text-4xl font-extrabold text-teal"><AnimatedNumber value={r.cost} format={gbp} /></dd></div>
                </dl>
              ) : (
                <p className="text-on-navy-muted">Enter all three values above zero to see your estimate.</p>
              )}
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">Illustrative estimate. Actual results depend on your volume and workflow.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Pricing ---------------- */
export function Pricing() {
  const plans = [
    { name: "Lead Qualifier + Voice Agent", popular: true, setup: "£1,200", monthly: "£500",
      items: ["AI voice agent", "Candidate qualification workflow", "Retry logic", "Slack alerts", "Structured results in Airtable and Google Sheets", "Outreach emails", "Ongoing monitoring and improvements"] },
    { name: "Lead Qualification Only", setup: "£700", monthly: "£300", note: "No voice calls.",
      items: ["Candidate intake and qualification workflow", "Automated scoring", "Outreach emails", "Slack alerts", "Reporting", "Ongoing support"] },
  ];
  return (
    <section id="pricing" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHead eyebrow="Pricing" title="Simple, transparent pricing" intro="Fast setup, tailored to your workflow." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 80} className="h-full">
              <article className={`lift relative flex h-full flex-col rounded-2xl border bg-card p-7 ${p.popular ? "border-2 border-teal-strong shadow-lift" : "shadow-soft"}`}>
                {p.popular && <span className="absolute -top-3 left-7 rounded-full bg-teal px-3 py-1 text-xs font-bold text-navy-deep">Most popular</span>}
                <h3 className="text-xl font-bold">{p.name}</h3>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-secondary p-3"><p className="text-xs font-medium text-muted-foreground">One-time setup</p><p className="text-2xl font-extrabold">{p.setup}</p></div>
                  <div className="rounded-xl bg-navy p-3 text-on-navy"><p className="text-xs font-medium text-on-navy-muted">Then per month</p><p className="text-2xl font-extrabold">{p.monthly}<span className="text-sm font-medium">/mo</span></p></div>
                </div>
                {p.note && <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold"><PhoneOff className="h-4 w-4 text-destructive" aria-hidden /> {p.note}</p>}
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.items.map((it) => (
                    <li key={it} className="flex gap-2 text-[15px]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-strong" aria-hidden />{it}</li>
                  ))}
                </ul>
                <DemoButton variant={p.popular ? "accent" : "default"} className="mt-7 w-full" />
              </article>
            </Reveal>
          ))}
          <Reveal delay={160} className="h-full">
            <article className="lift flex h-full flex-col rounded-2xl border bg-card p-7 shadow-soft">
              <h3 className="text-xl font-bold">Custom</h3>
              <p className="mt-5 text-3xl font-extrabold">Let's talk</p>
              <p className="mt-4 flex-1 text-muted-foreground">For ATS or CRM integrations, multiple offices, or special workflows.</p>
              <Button asChild size="lg" variant="outline" className="mt-7 w-full"><a href="#contact">Contact us <ArrowRight /></a></Button>
            </article>
          </Reveal>
        </div>
        <div className="mt-8 space-y-1 text-center text-sm text-muted-foreground">
          <p>Third-party tool and call-minute costs are billed directly by the providers to you.</p>
          <p>Prices are shown in GBP and exclude any applicable taxes.</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Faq() {
  const qs = [
    ["Does the AI say it is an AI?", "Yes. It identifies itself as AI at the start of every call and answers honestly if asked."],
    ["What if the candidate wants a human?", "The agent notes the request, ends the call politely, and your team follows up."],
    ["Do you generate leads?", "No. Satvim qualifies candidates you already have; we do not generate leads or run ads."],
    ["Can we change the screening questions?", "Yes. The questions and qualification criteria are customisable."],
    ["Who owns the data and accounts?", "You own your accounts and data."],
    ["Which tools do you use?", "Make.com, Vapi, Airtable, Google Sheets, Slack and Gmail. Other integrations are available on a custom plan."],
    ["How are calls recorded?", "The agent tells the candidate when a call is recorded and transcribed, and supports opt-out, stop-contact and data-deletion requests."],
    ["How long does setup take?", "Fast setup, tailored to your workflow."],
  ];
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHead eyebrow="FAQ" title="Questions, answered" />
        <Reveal className="mt-10">
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-6 shadow-soft">
            {qs.map(([q, a], i) => (
              <AccordionItem key={i} value={`q${i}`} className={i === qs.length - 1 ? "border-b-0" : ""}>
                <AccordionTrigger className="py-5 text-left text-base font-semibold">{q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- CTA band ---------------- */
export function CtaBand() {
  return (
    <section className="px-5 pb-20">
      <Reveal>
        <div className="on-navy bg-hero mx-auto max-w-6xl rounded-3xl px-6 py-14 text-center sm:px-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-on-navy sm:text-4xl">Ready to stop screening by hand?</h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <DemoButton />
            <Button asChild size="lg" variant="onNavy"><a href={`mailto:${EMAIL}`}><Mail /> Email us</a></Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Contact ---------------- */
type Errors = Partial<Record<"name" | "email" | "agency" | "message", string>>;

export function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [mailto, setMailto] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget)) as Partial<Record<"name" | "email" | "agency" | "volume" | "message", string>>;
    const errs: Errors = {};
    if (!d.name?.trim()) errs.name = "Please enter your name.";
    if (!d.email?.trim()) errs.email = "Please enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) errs.email = "Please enter a valid email address.";
    if (!d.agency?.trim()) errs.agency = "Please enter your agency name.";
    if (!d.message?.trim()) errs.message = "Please enter a message.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      document.getElementById(`c-${first}`)?.focus();
      return;
    }
    const body = `Name: ${d.name}\nWork email: ${d.email}\nAgency: ${d.agency}\nMonthly candidate volume: ${d.volume || "-"}\n\n${d.message}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Enquiry from ${d.agency}`)}&body=${encodeURIComponent(body)}`;
    setMailto(href);
    window.location.href = href;
  }

  const field = (id: keyof Errors | "volume", label: string, el: ReactNode, required = true) => (
    <div>
      <Label htmlFor={`c-${id}`}>{label}{required && <span aria-hidden className="text-destructive"> *</span>}</Label>
      <div className="mt-2">{el}</div>
      {id !== "volume" && errors[id] && <p id={`c-${id}-err`} className="mt-1.5 text-sm font-medium text-destructive">{errors[id]}</p>}
    </div>
  );
  const aria = (id: keyof Errors) => ({ id: `c-${id}`, name: id, "aria-invalid": !!errors[id], "aria-describedby": errors[id] ? `c-${id}-err` : undefined, "aria-required": true });

  return (
    <section id="contact" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.3fr]">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-strong">Contact</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Let's talk about your screening</h2>
          <p className="mt-4 text-lg text-muted-foreground">Tell us about your agency and we'll be in touch.</p>
          <ul className="mt-8 space-y-4">
            <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-3 font-medium hover:text-teal-strong"><Mail className="h-5 w-5 text-teal-strong" aria-hidden />{EMAIL}</a></li>
            <li><a href={PHONE_TEL} className="inline-flex items-center gap-3 font-medium hover:text-teal-strong"><Phone className="h-5 w-5 text-teal-strong" aria-hidden />{PHONE_DISPLAY}</a></li>
            <li className="text-muted-foreground">{LOCATION}</li>
          </ul>
        </Reveal>
        <Reveal delay={100}>
          {mailto ? (
            <div className="rounded-2xl border bg-card p-8 shadow-soft" role="status">
              <CheckCircle2 className="h-8 w-8 text-success" aria-hidden />
              <h3 className="mt-4 text-xl font-bold">Your email draft is ready</h3>
              <p className="mt-2 text-muted-foreground">
                We've opened your email app with your details filled in. Your enquiry is <strong>not sent</strong> until you press send there.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild><a href={mailto}>Open email again</a></Button>
                <Button variant="outline" onClick={() => setMailto(null)}>Edit enquiry</Button>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">No email app? Write to us directly at <a className="text-teal-strong underline" href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-5 rounded-2xl border bg-card p-6 shadow-soft sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {field("name", "Name", <Input {...aria("name")} autoComplete="name" className="h-11" />)}
                {field("email", "Work email", <Input {...aria("email")} type="email" autoComplete="email" className="h-11" />)}
                {field("agency", "Agency name", <Input {...aria("agency")} autoComplete="organization" className="h-11" />)}
                {field("volume", "Approximate monthly candidate volume", <Input id="c-volume" name="volume" inputMode="numeric" className="h-11" />, false)}
              </div>
              {field("message", "Message", <Textarea {...aria("message")} rows={5} />)}
              <Button type="submit" size="lg" className="w-full sm:w-auto">Send enquiry <ArrowRight /></Button>
              <p className="text-xs text-muted-foreground">Submitting opens your email app with a pre-filled message to {EMAIL}.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="on-navy bg-navy-deep text-on-navy-muted">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <span className="flex flex-col leading-none">
            <Logo reversed className="text-2xl" />
            <span className="mt-1 text-[10px] font-medium tracking-wide text-on-navy-muted">AI Automation for Recruitment Agencies</span>
          </span>
          <p className="mt-4 max-w-xs text-sm">Satvim builds AI voice screening workflows that qualify the candidates UK recruitment agencies already receive.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="space-y-2 text-sm">
            {[...NAV, { href: "#contact", label: "Contact" }].map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-on-navy">{n.label}</a></li>
            ))}
            <li><Link to="/privacy" className="hover:text-on-navy">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-on-navy">Terms</Link></li>
          </ul>
        </nav>
        <ul className="space-y-3 text-sm">
          <li><a href={`mailto:${EMAIL}`} className="hover:text-on-navy">{EMAIL}</a></li>
          <li><a href={PHONE_TEL} className="hover:text-on-navy">{PHONE_DISPLAY}</a></li>
          <li>{LOCATION}</li>
          <li>
            {isPlaceholder(LINKEDIN_URL) ? (
              <span className="inline-flex items-center gap-2" data-placeholder="{{LINKEDIN_URL}}"><Linkedin className="h-4 w-4" aria-hidden /> LinkedIn (coming soon)</span>
            ) : (
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-on-navy"><Linkedin className="h-4 w-4" aria-hidden /> LinkedIn</a>
            )}
          </li>
        </ul>
      </div>
      <div className="border-t border-on-navy/10 py-5 text-center text-xs">© 2026 Satvim</div>
    </footer>
  );
}
