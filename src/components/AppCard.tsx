import Link from "next/link";
import type { MobileApp } from "@/types/app";
import { AppLogoImage } from "./AppLogoImage";
import { PricingBadge } from "./PricingBadge";

type Props = {
  app: MobileApp;
  /** Tarjetas más grandes para la sección de novedades */
  featured?: boolean;
};

export function AppCard({ app, featured = false }: Props) {
  const logoSize = featured
    ? "h-[5.25rem] w-[5.25rem] sm:h-28 sm:w-28"
    : "h-[4.75rem] w-[4.75rem] sm:h-24 sm:w-24";
  const padding = featured ? "p-6 sm:p-7" : "p-5 sm:p-6";
  const gap = featured ? "gap-5" : "gap-4";
  const titleClass = featured
    ? "text-xl sm:text-2xl"
    : "text-lg sm:text-xl";
  const descClass = featured
    ? "text-[15px] sm:text-base leading-relaxed"
    : "text-sm sm:text-[15px] leading-relaxed";
  const imageSizes = featured ? "112px" : "96px";
  const rounded = featured ? "rounded-3xl" : "rounded-3xl";

  return (
    <Link
      href={`/apps/${app.slug}`}
      className={`group card-shine relative flex h-full flex-col overflow-hidden border border-slate-200/90 bg-white/90 shadow-lg shadow-slate-900/[0.06] ring-1 ring-white/60 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/10 dark:border-slate-700/80 dark:bg-slate-900/70 dark:shadow-black/40 dark:ring-slate-800/60 dark:hover:border-primary/40 dark:hover:shadow-primary/15 ${rounded}`}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-primary/20" />

      <div className={`relative flex flex-1 flex-col ${gap} ${padding}`}>
        <div className="flex items-start justify-between gap-3">
          <div
            className={`relative ${logoSize} shrink-0 overflow-hidden rounded-2xl`}
          >
            <AppLogoImage
              src={app.logo_url}
              alt={`Logotipo de ${app.name}`}
              sizes={imageSizes}
              className="transition duration-300 group-hover:scale-105"
            />
          </div>
          <PricingBadge pricing={app.pricing} />
        </div>

        <div className="min-w-0 flex-1">
          <h2
            className={`font-bold tracking-tight text-slate-900 transition group-hover:text-primary dark:text-white dark:group-hover:text-sky-300 ${titleClass}`}
          >
            {app.name}
          </h2>
          <p
            className={`mt-2 line-clamp-6 text-pretty text-slate-600 dark:text-slate-400 ${descClass}`}
          >
            {app.description_short}
          </p>
        </div>
      </div>

      <div
        className={`relative mt-auto flex flex-wrap gap-2 border-t border-slate-100/90 bg-slate-50/60 dark:border-slate-800/80 dark:bg-slate-950/40 ${featured ? "px-6 py-4 sm:px-7" : "px-5 py-3.5 sm:px-6"}`}
      >
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200/80 dark:bg-slate-800/80 dark:text-slate-300 dark:ring-slate-600/60"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
