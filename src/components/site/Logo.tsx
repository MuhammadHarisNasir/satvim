import logo from "@/assets/harisflows-logo.png";
import logoWhite from "@/assets/harisflows-logo-white.png";

export function Logo({ reversed = false, className = "h-9" }: { reversed?: boolean; className?: string }) {
  return (
    <img
      src={reversed ? logoWhite : logo}
      alt="HarisFlows"
      className={`${className} w-auto`}
      width={1527}
      height={700}
    />
  );
}
