import Link from "next/link";

export default function AppNotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-10 shadow-xl shadow-slate-900/[0.06] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-black/40">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-sky-400">
          404
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
          App no encontrada
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Ese enlace no corresponde a ninguna app del catálogo.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-gradient-to-r from-primary to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/30 transition hover:brightness-105 dark:from-sky-600 dark:to-indigo-600 dark:shadow-sky-900/40"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
