import logo from "@/assets/harryflows-logo.png.asset.json";
import logoWhite from "@/assets/harryflows-logo-white.png.asset.json";

export function Logo({ reversed = false, className = "h-9" }: { reversed?: boolean; className?: string }) {
  return (
    <img
      src={reversed ? logoWhite.url : logo.url}
      alt="HarryFlows"
      className={`${className} w-auto`}
      width={764}
      height={350}
    />
  );
}
