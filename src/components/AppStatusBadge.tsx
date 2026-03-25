type Props = {
  inProduction: boolean;
};

export function AppStatusBadge({ inProduction }: Props) {
  if (inProduction) {
    return (
      <span
        className="inline-flex shrink-0 items-center rounded-full bg-emerald-500/12 px-2.5 py-0.5 text-xs font-semibold text-emerald-800 ring-1 ring-inset ring-emerald-500/30 dark:bg-emerald-400/12 dark:text-emerald-200 dark:ring-emerald-400/35"
        title="Tiene enlace en App Store o Google Play"
      >
        Disponible
      </span>
    );
  }

  return (
    <span
      className="inline-flex shrink-0 items-center rounded-full bg-amber-500/12 px-2.5 py-0.5 text-xs font-semibold text-amber-950 ring-1 ring-inset ring-amber-500/35 dark:bg-amber-400/12 dark:text-amber-100 dark:ring-amber-400/35"
      title="Aún sin publicación en tiendas"
    >
      En desarrollo
    </span>
  );
}
