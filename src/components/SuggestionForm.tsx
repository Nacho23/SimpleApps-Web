"use client";

import { type FormEvent, useState } from "react";

export function SuggestionForm() {
  const [idea, setIdea] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const contact =
    typeof process.env.NEXT_PUBLIC_CONTACT_EMAIL === "string"
      ? process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim()
      : "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback(null);

    const trimmed = idea.trim();
    if (!trimmed) {
      setFeedback("Escribe qué app te gustaría que existiera.");
      return;
    }

    const body = [
      "Idea de app que me gustaría:",
      "",
      trimmed,
      "",
      "---",
      `Nombre (opcional): ${name.trim() || "—"}`,
      `Email (opcional): ${email.trim() || "—"}`,
    ].join("\n");

    const subject = encodeURIComponent("Sugerencia de app · SimpleApps");

    if (contact) {
      window.location.href = `mailto:${contact}?subject=${subject}&body=${encodeURIComponent(body)}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(body);
      setFeedback(
        "Texto copiado al portapapeles. Pégalo en un correo y envíamelo cuando quieras. (Para abrir el correo automáticamente, configura NEXT_PUBLIC_CONTACT_EMAIL.)",
      );
    } catch {
      setFeedback(
        "No se pudo copiar. Añade NEXT_PUBLIC_CONTACT_EMAIL en tu proyecto o copia el texto manualmente.",
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mt-6 space-y-4 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg shadow-slate-900/[0.04] ring-1 ring-white/60 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/25 dark:ring-slate-800/50 sm:p-8"
    >
      <div>
        <label
          htmlFor="idea-app"
          className="text-sm font-semibold text-slate-800 dark:text-slate-100"
        >
          ¿Qué app te gustaría que hiciéramos?
        </label>
        <textarea
          id="idea-app"
          name="idea"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={5}
          placeholder="Cuéntame el problema que resolvería, para quién sería útil, o cualquier detalle que se te ocurra…"
          className="mt-2 w-full resize-y rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-inner outline-none ring-primary/0 transition placeholder:text-slate-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="suggest-name"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Tu nombre (opcional)
          </label>
          <input
            id="suggest-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
          />
        </div>
        <div>
          <label
            htmlFor="suggest-email"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Email (opcional)
          </label>
          <input
            id="suggest-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
          />
        </div>
      </div>

      {!contact && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Tip para el sitio en producción: define{" "}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-[11px] dark:bg-slate-800">
            NEXT_PUBLIC_CONTACT_EMAIL
          </code>{" "}
          y al enviar se abrirá tu gestor de correo con el mensaje listo.
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:brightness-105 dark:from-sky-600 dark:to-indigo-600 dark:shadow-sky-900/30"
        >
          {contact ? "Enviar sugerencia por correo" : "Copiar mensaje y listo"}
        </button>
      </div>

      {feedback && (
        <p
          className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-slate-700 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-slate-200"
          role="status"
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
