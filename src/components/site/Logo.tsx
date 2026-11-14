export function Logo({ reversed = false, className = "text-2xl" }: { reversed?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-extrabold tracking-tight ${reversed ? "text-on-navy" : "text-foreground"} ${className}`}
      role="img"
      aria-label="Satvim"
    >
      <span aria-hidden="true" className="inline-flex items-baseline">
        Sat
        <span className="text-teal inline-flex items-baseline">
          <svg
            viewBox="0 0 660 638"
            aria-hidden="true"
            style={{ display: "inline-block", height: "0.638em", width: "0.66em", verticalAlign: "baseline", marginRight: "0.03em" }}
          >
            <polygon fill="currentColor" points="313,478 458.3,0 644.4,0 418,638 207,638 23.2,120 204.2,120" />
          </svg>
          im
        </span>
      </span>
    </span>
  );
}
