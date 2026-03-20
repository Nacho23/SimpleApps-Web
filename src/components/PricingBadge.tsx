import type { Pricing } from "@/types/app";

const styles: Record<Pricing, string> = {
  free:
    "bg-emerald-500/10 text-emerald-800 ring-emerald-500/25 dark:bg-emerald-400/15 dark:text-emerald-200 dark:ring-emerald-400/25",
  paid:
    "bg-amber-500/10 text-amber-900 ring-amber-500/30 dark:bg-amber-400/12 dark:text-amber-200 dark:ring-amber-400/25",
  freemium:
    "bg-sky-500/10 text-sky-900 ring-sky-500/25 dark:bg-sky-400/15 dark:text-sky-100 dark:ring-sky-400/25",
};

const labels: Record<Pricing, string> = {
  free: "Gratis",
  paid: "De pago",
  freemium: "Freemium",
};

export function PricingBadge({ pricing }: { pricing: Pricing }) {
  return (
    <span
      className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${styles[pricing]}`}
    >
      {labels[pricing]}
    </span>
  );
}
