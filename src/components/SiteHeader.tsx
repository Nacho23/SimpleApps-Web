import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75 dark:shadow-black/20">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent dark:via-primary/35" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-3 rounded-xl outline-none ring-primary/0 transition focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-indigo-600 text-sm font-bold text-white shadow-md shadow-primary/25 ring-2 ring-white/30 dark:ring-slate-900/50">
            S
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              Simple<span className="text-primary dark:text-sky-400">Apps</span>
            </span>
            <span className="hidden text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500 sm:block">
              Biblioteca de apps
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <p className="hidden max-w-[220px] text-right text-xs leading-snug text-slate-500 dark:text-slate-400 lg:block">
            Mini apps seleccionadas para el día a día
          </p>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
