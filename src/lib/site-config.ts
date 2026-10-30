// ---------------------------------------------------------------
// REPLACE THESE PLACEHOLDERS with real URLs when available.
// Unreplaced values (still wrapped in {{ }}) render a safe placeholder state.
// ---------------------------------------------------------------
export const CALENDLY_URL = "{{CALENDLY_URL}}";
export const DEMO_VIDEO_URL = "{{DEMO_VIDEO_URL}}";
export const DEMO_AUDIO_URL = "{{DEMO_AUDIO_URL}}";
export const LINKEDIN_URL = "{{LINKEDIN_URL}}";

export const EMAIL = "harryflows.ai@gmail.com";
export const PHONE_DISPLAY = "+92 371 7466108";
export const PHONE_TEL = "tel:+923717466108";
export const LOCATION = "Remote-first agency serving UK recruitment agencies";

export const isPlaceholder = (v: string) => /^\{\{.*\}\}$/.test(v);

export function calcRoi(candidates: number, minutes: number, hourly: number) {
  if (![candidates, minutes, hourly].every((n) => Number.isFinite(n) && n > 0)) return null;
  const hours = (candidates * minutes) / 60;
  return { hours, cost: hours * hourly };
}

export const gbp = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(n);
