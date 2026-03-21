type Props = {
  eyebrow: string;
  title: string;
  hint?: string;
};

export function SectionTitle({ eyebrow, title, hint }: Props) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary/90 dark:text-sky-400/90">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
          {title}
        </h2>
      </div>
      {hint && (
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {hint}
        </span>
      )}
    </div>
  );
}
