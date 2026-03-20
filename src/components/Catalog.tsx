"use client";

import { useMemo, useState } from "react";
import type { MobileApp } from "@/types/app";
import { AppCard } from "./AppCard";
import { SuggestionForm } from "./SuggestionForm";

type Props = {
  apps: MobileApp[];
  allTags: string[];
};

function SectionTitle({
  eyebrow,
  title,
  hint,
}: {
  eyebrow: string;
  title: string;
  hint?: string;
}) {
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

export function Catalog({ apps, allTags }: Props) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const latest = useMemo(
    () =>
      [...apps]
        .sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime(),
        )
        .slice(0, 4),
    [apps],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apps.filter((app) => {
      const matchesQuery =
        !q ||
        app.name.toLowerCase().includes(q) ||
        app.description_short.toLowerCase().includes(q);
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => app.tags.includes(t));
      return matchesQuery && matchesTags;
    });
  }, [apps, query, selectedTags]);

  const latestIds = useMemo(() => new Set(latest.map((a) => a.id)), [latest]);

  const singleApp = apps.length === 1;

  const browseList = useMemo(() => {
    const hasFilters = query.trim().length > 0 || selectedTags.length > 0;
    if (hasFilters) return filtered;
    if (singleApp) return filtered;
    return filtered.filter((app) => !latestIds.has(app.id));
  }, [filtered, latestIds, query, selectedTags, singleApp]);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/60 p-8 shadow-xl shadow-slate-900/[0.04] ring-1 ring-white/70 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/50 dark:shadow-black/30 dark:ring-slate-800/50 sm:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-primary/20 to-indigo-500/10 blur-3xl dark:from-primary/25 dark:to-indigo-500/15" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-sky-400/10 blur-3xl dark:bg-sky-500/15" />

        <div className="relative max-w-3xl animate-fade-up space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary dark:border-sky-500/25 dark:bg-sky-500/10 dark:text-sky-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(37,99,235,0.8)] dark:bg-sky-400 dark:shadow-[0_0_8px_rgba(56,189,248,0.7)]" />
            Catálogo · {apps.length}{" "}
            {apps.length === 1 ? "app" : "apps"} · todas gratuitas
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
            que nos ayuden con un quehacer concreto del día a día. Abre la
            tarjeta para ver capturas, plataformas y enlaces a la tienda.
          </p>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            <strong className="font-semibold text-slate-700 dark:text-slate-300">
              Precio:
            </strong>{" "}
            todo el catálogo es gratis. Si alguna app ofreciera extras en el
            futuro, serían compras opcionales{" "}
            <strong className="font-medium text-slate-700 dark:text-slate-300">
              solo dentro de la app
            </strong>
            , nunca pagos por fuera de App Store o Google Play.
          </p>
        </div>
      </div>

      {singleApp ? (
        <section className="mt-12 sm:mt-16">
          <SectionTitle
            eyebrow="Disponible ahora"
            title="La app"
            hint="Toca la tarjeta para ver la ficha completa"
          />
          <div className="mx-auto mt-6 max-w-lg">
            <AppCard app={apps[0]} featured />
          </div>
        </section>
      ) : (
        <>
          <section className="mt-12 sm:mt-16">
            <SectionTitle
              eyebrow="Novedades"
              title="Últimas apps lanzadas"
              hint="Por fecha de lanzamiento"
            />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {latest.map((app) => (
                <AppCard key={app.id} app={app} featured />
              ))}
            </div>
          </section>

          <section className="mt-14 sm:mt-16">
            <SectionTitle eyebrow="Explorar" title="Toda la biblioteca" />

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-stretch">
              <label className="group relative block flex-1">
                <span className="sr-only">Buscar apps</span>
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    aria-hidden
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar por nombre o descripción breve…"
                  className="w-full rounded-2xl border border-slate-200/90 bg-white/90 py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-inner shadow-slate-900/[0.02] outline-none ring-primary/0 transition placeholder:text-slate-400 focus:border-primary/40 focus:ring-4 focus:ring-primary/15 dark:border-slate-700/90 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-sky-500/50 dark:focus:ring-sky-500/15"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Etiquetas
              </span>
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={clearTags}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-primary underline-offset-2 hover:underline dark:text-sky-400"
                >
                  Quitar filtros
                </button>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      active
                        ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-md shadow-primary/25 ring-1 ring-white/20 dark:from-sky-600 dark:to-indigo-600 dark:shadow-sky-900/30"
                        : "border border-slate-200/90 bg-white/80 text-slate-700 shadow-sm hover:border-primary/25 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-sky-500/30 dark:hover:bg-slate-800/80"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

            <p className="mt-8 text-sm font-medium text-slate-600 dark:text-slate-400">
              <span className="tabular-nums text-slate-900 dark:text-slate-100">
                {browseList.length}
              </span>{" "}
              {browseList.length === 1 ? "app en esta lista" : "apps en esta lista"}
              {!query.trim() && selectedTags.length === 0 && latest.length > 0 && (
                <span className="text-slate-400 dark:text-slate-500">
                  {" "}
                  — las novedades están destacadas arriba
                </span>
              )}
            </p>

            <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {browseList.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>

            {browseList.length === 0 && (
              <p className="mt-10 rounded-3xl border border-dashed border-slate-300/90 bg-slate-50/80 px-8 py-14 text-center text-base text-slate-600 shadow-inner dark:border-slate-600/60 dark:bg-slate-900/40 dark:text-slate-400">
                {filtered.length === 0
                  ? "Ninguna app coincide con tus filtros. Prueba otra búsqueda o quita etiquetas."
                  : "Todas las apps que coinciden ya aparecen en Últimas apps lanzadas arriba."}
              </p>
            )}
          </section>
        </>
      )}

      <section className="mt-16 sm:mt-20">
        <SectionTitle
          eyebrow="Participa"
          title="¿Qué app te gustaría que hiciéramos?"
          hint="Tu idea llega directo a mi correo"
        />
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          Cuéntame qué problema resolverías, para quién sería útil o qué
          herramienta echas en falta. Leo todas las sugerencias y me ayudan a
          priorizar qué construir después.
        </p>
        <SuggestionForm />
      </section>
    </div>
  );
}
