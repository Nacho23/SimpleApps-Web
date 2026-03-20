/** Decorative background layers (no client JS). */
export function PageBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[var(--page-base)]" />
      <div className="absolute -left-1/4 top-0 h-[520px] w-[70%] rounded-full bg-primary/[0.08] blur-[100px] dark:bg-primary/[0.14]" />
      <div className="absolute -right-1/4 top-28 h-[400px] w-[52%] rounded-full bg-sky-400/[0.07] blur-[88px] dark:bg-sky-500/[0.1]" />
      <div className="absolute bottom-[-10%] left-1/4 h-[360px] w-[50%] rounded-full bg-indigo-500/[0.06] blur-[96px] dark:bg-indigo-400/[0.09]" />
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage: "var(--dot-grid)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}
