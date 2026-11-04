import { useEffect, useRef, useState } from "react";
import { BarChart3, Bell, PhoneCall, UserPlus } from "lucide-react";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Smoothly tweens a number towards `target`. Shows the final value instantly under reduced motion. */
export function useAnimatedNumber(target: number, duration = 500) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    if (reduced()) {
      fromRef.current = target;
      setValue(target);
      return;
    }
    const from = fromRef.current;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const next = from + (target - from) * eased;
      fromRef.current = next;
      setValue(next);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export function AnimatedNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const n = useAnimatedNumber(value);
  return <span className="tabular-nums">{format(n)}</span>;
}

const NODES = [
  { icon: UserPlus, label: "Candidate applies" },
  { icon: PhoneCall, label: "AI call" },
  { icon: BarChart3, label: "Structured results" },
  { icon: Bell, label: "Slack alert" },
];

/** Looping flow diagram; animation pauses when off-screen. */
export function FlowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setPlaying(!!e?.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} data-playing={playing} className="flow mt-12 rounded-2xl border bg-card p-6 shadow-soft sm:p-8" aria-label="Flow: candidate applies, AI call, structured results, Slack alert" role="img">
      <div className="flex flex-col items-center md:flex-row md:items-center">
        {NODES.map((n, i) => (
          <div key={n.label} className="contents">
            <div className="flex w-40 shrink-0 flex-col items-center text-center">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-teal"><n.icon className="h-5 w-5" aria-hidden /></span>
              <span className="mt-3 text-sm font-semibold">{n.label}</span>
            </div>
            {i < NODES.length - 1 && (
              <div className="flow-track relative h-10 w-0.5 bg-border md:mb-7 md:h-0.5 md:w-auto md:flex-1" aria-hidden>
                <span className="flow-runner absolute inset-0" style={{ animationDelay: `${i * 0.8}s` }}>
                  <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-strong md:left-0 md:top-1/2" />
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
