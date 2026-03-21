type Props = {
  appsCount: number;
};

export function HomeHero({ appsCount }: Props) {
  const label =
    appsCount === 1 ? "1 app" : `${appsCount} apps`;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 p-8 shadow-xl shadow-slate-900/[0.04] ring-1 ring-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/30 dark:ring-slate-800/50 sm:p-10">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-primary/20 to-indigo-500/10 blur-3xl dark:from-primary/25 dark:to-indigo-500/15" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/15" />

      <div className="relative max-w-3xl animate-fade-up space-y-4">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300">
          <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:bg-sky-400 dark:shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
          Catálogo · {label} · todas gratuitas
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[2.65rem] lg:leading-[1.1]">
          <span className="text-gradient-hero">
            Apps móviles claras y con propósito
          </span>
        </h1>
        <p className="animate-fade-up-delay text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
          Las desarrollo con ayuda de inteligencia artificial, pero la idea es
          siempre la misma:{" "}
          <strong className="font-semibold text-slate-800 dark:text-slate-200">
            herramientas simples y enfocadas
          </strong>{" "}
          que nos ayuden con un quehacer concreto del día a día. Abre la tarjeta
          para ver capturas, plataformas y enlaces a la tienda.
        </p>
      </div>
    </div>
  );
}
