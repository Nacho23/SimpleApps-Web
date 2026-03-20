"use client";

import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { AppComment, FeedbackKind } from "@/types/app-comment";

const kindLabels: Record<FeedbackKind, string> = {
  mejora: "Mejora o idea",
  error: "Error o algo que no funciona",
  otro: "Otro comentario",
};

const kindBadgeClass: Record<FeedbackKind, string> = {
  mejora:
    "bg-emerald-500/15 text-emerald-800 dark:bg-emerald-400/15 dark:text-emerald-200",
  error:
    "bg-rose-500/15 text-rose-800 dark:bg-rose-400/15 dark:text-rose-200",
  otro: "bg-slate-500/15 text-slate-700 dark:bg-slate-400/20 dark:text-slate-200",
};

type Props = {
  appName: string;
  appSlug: string;
  initialComments: AppComment[];
  storageConfigured: boolean;
};

function formatCommentDate(iso: string) {
  return new Intl.DateTimeFormat("es", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function AppCommentsSection({
  appName,
  appSlug,
  initialComments,
  storageConfigured,
}: Props) {
  const router = useRouter();
  const [kind, setKind] = useState<FeedbackKind>("mejora");
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const contact =
    typeof process.env.NEXT_PUBLIC_CONTACT_EMAIL === "string"
      ? process.env.NEXT_PUBLIC_CONTACT_EMAIL.trim()
      : "";

  useEffect(() => {
    setFeedback(null);
  }, [initialComments]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFeedback(null);

    const trimmed = message.trim();
    if (trimmed.length < 2) {
      setFeedback("Escribe tu comentario antes de enviar.");
      return;
    }

    if (storageConfigured) {
      setSubmitting(true);
      try {
        const res = await fetch(`/api/apps/${appSlug}/comments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind,
            message: trimmed,
            name: name.trim() || undefined,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        if (!res.ok) {
          setFeedback(data.error ?? "No se pudo publicar el comentario.");
          return;
        }
        setMessage("");
        setName("");
        setEmail("");
        setFeedback("¡Listo! Tu comentario ya está publicado abajo.");
        router.refresh();
      } finally {
        setSubmitting(false);
      }
      return;
    }

    const mailBody = [
      `App: ${appName} (slug: ${appSlug})`,
      `Tipo: ${kindLabels[kind]}`,
      "",
      trimmed,
      "",
      "---",
      `Nombre (opcional): ${name.trim() || "—"}`,
      `Email (opcional): ${email.trim() || "—"}`,
    ].join("\n");

    const subject = encodeURIComponent(`Feedback · ${appName} · SimpleApps`);

    if (contact) {
      window.location.href = `mailto:${contact}?subject=${subject}&body=${encodeURIComponent(mailBody)}`;
      return;
    }

    try {
      await navigator.clipboard.writeText(mailBody);
      setFeedback(
        "Texto copiado al portapapeles. Pégalo en un correo y envíamelo. (Configura UPSTASH_REDIS_* para publicar aquí, o NEXT_PUBLIC_CONTACT_EMAIL para abrir el correo.)",
      );
    } catch {
      setFeedback(
        "Configura Upstash Redis para comentarios en la página, o NEXT_PUBLIC_CONTACT_EMAIL.",
      );
    }
  }

  return (
    <section className="mt-12 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-xl shadow-slate-900/[0.04] ring-1 ring-white/60 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/25 dark:ring-slate-800/50 sm:p-8">
      <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-sky-400">
        Comentarios
      </h2>
      <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
        Mejoras, errores y dudas sobre {appName}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Los comentarios que envíes pueden mostrarse en esta página para que otras
        personas vean qué se ha reportado o sugerido (si activaste almacenamiento
        en el servidor).
      </p>

      <div className="mt-5 rounded-2xl border border-amber-200/90 bg-amber-50/90 p-4 text-sm leading-relaxed text-amber-950 dark:border-amber-500/25 dark:bg-amber-950/30 dark:text-amber-100">
        <p className="font-semibold text-amber-900 dark:text-amber-50">
          Comunidad con respeto
        </p>
        <p className="mt-2 text-amber-900/95 dark:text-amber-100/90">
          Escribe con educación y buena fe. No publiques insultos, ataques
          personales, comentarios denigrantes ni lenguaje de odio. Los mensajes
          inapropiados pueden eliminarse. El objetivo es mejorar la app entre
          todos.
        </p>
      </div>

      {!storageConfigured && (
        <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50/90 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-400">
          <strong className="text-slate-800 dark:text-slate-200">
            Comentarios en esta página:
          </strong>{" "}
          configura{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-600">
            UPSTASH_REDIS_REST_URL
          </code>{" "}
          y{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-600">
            UPSTASH_REDIS_REST_TOKEN
          </code>{" "}
          (cuenta gratuita en Upstash) para que los mensajes queden guardados
          aquí. Mientras tanto puedes enviar por correo si tienes{" "}
          <code className="rounded bg-white px-1 py-0.5 text-xs dark:bg-slate-800">
            NEXT_PUBLIC_CONTACT_EMAIL
          </code>
          .
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Lo que ha comentado la gente
        </h3>
        {initialComments.length === 0 ? (
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Aún no hay comentarios públicos. ¡Puedes ser el primero!
          </p>
        ) : (
          <ul className="mt-4 flex flex-col gap-4">
            {initialComments.map((c) => (
              <li
                key={c.id}
                className="rounded-2xl border border-slate-200/90 bg-white/80 px-4 py-3 dark:border-slate-700/90 dark:bg-slate-900/40"
              >
                <div className="flex flex-wrap items-center gap-2 gap-y-1">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${kindBadgeClass[c.kind]}`}
                  >
                    {kindLabels[c.kind]}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {formatCommentDate(c.createdAt)}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                  {c.authorName ?? "Anónimo"}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {c.body}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3 className="mt-10 text-sm font-bold text-slate-900 dark:text-white">
        Deja tu comentario
      </h3>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="comment-kind"
            className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
          >
            Tipo
          </label>
          <select
            id="comment-kind"
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as FeedbackKind)}
            className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
          >
            {(Object.keys(kindLabels) as FeedbackKind[]).map((k) => (
              <option key={k} value={k}>
                {kindLabels[k]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="comment-message"
            className="text-sm font-semibold text-slate-800 dark:text-slate-100"
          >
            Mensaje
          </label>
          <textarea
            id="comment-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={5}
            maxLength={2000}
            placeholder="Describe la mejora, el fallo o tu duda (máx. 2000 caracteres)."
            className="mt-2 w-full resize-y rounded-2xl border border-slate-200/90 bg-white/90 px-4 py-3 text-sm text-slate-900 shadow-inner outline-none ring-primary/0 transition placeholder:text-slate-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
          />
          <p className="mt-1 text-xs text-slate-400">{message.length}/2000</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="comment-name"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Nombre (opcional)
            </label>
            <input
              id="comment-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={80}
              autoComplete="name"
              className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
            />
          </div>
          <div>
            <label
              htmlFor="comment-email"
              className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
            >
              Email (opcional, solo si envías por correo)
            </label>
            <input
              id="comment-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              disabled={storageConfigured}
              title={
                storageConfigured
                  ? "No guardamos email en comentarios públicos"
                  : undefined
              }
              className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white/90 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-primary/40 focus:ring-4 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:brightness-105 disabled:opacity-60 sm:w-auto dark:from-sky-600 dark:to-indigo-600 dark:shadow-sky-900/30"
        >
          {submitting
            ? "Publicando…"
            : storageConfigured
              ? "Publicar comentario"
              : contact
                ? "Enviar por correo"
                : "Copiar mensaje"}
        </button>

        {feedback && (
          <p
            className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-slate-700 dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-slate-200"
            role="status"
          >
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}
