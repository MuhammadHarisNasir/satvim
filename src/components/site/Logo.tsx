export function Logo({ reversed = false, className = "text-2xl" }: { reversed?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-tight ${reversed ? "text-on-navy" : "text-foreground"} ${className}`}
      aria-label="Satvim"
      role="img"
    >
      Sat<span className="text-teal">vim</span>
    </span>
  );
}
