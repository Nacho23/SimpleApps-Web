import Link from "next/link";

export function OpenAiKeyNotice() {
  return (
    <aside className="mt-8 rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-50/90 to-white/80 px-5 py-4 shadow-sm ring-1 ring-violet-100/80 dark:border-violet-500/20 dark:from-violet-950/40 dark:to-slate-900/60 dark:ring-violet-500/15 sm:px-6 sm:py-5">
      <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <span className="font-semibold text-violet-900 dark:text-violet-200">
          Apps con IA:
        </span>{" "}
        puedes usar{" "}
        <strong className="font-semibold text-slate-900 dark:text-white">
          tu propia clave de API de OpenAI
        </strong>{" "}
        (ChatGPT / GPT) dentro de cada app para activar las funciones
        inteligentes.{" "}
        <strong className="font-medium text-slate-800 dark:text-slate-200">
          La misma clave te sirve en todas
        </strong>
        —solo cópiala en cada app cuando te la pida.{" "}
        <Link
          href="#clave-openai"
          className="font-semibold text-primary underline-offset-2 hover:underline dark:text-sky-400"
        >
          Cómo conseguirla
        </Link>
      </p>
    </aside>
  );
}
