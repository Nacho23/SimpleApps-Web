"use client";

import { useMemo, useState } from "react";
import type { MobileApp } from "@/types/app";
import { AppCard } from "./AppCard";
import { SectionTitle } from "./SectionTitle";

type Props = {
  apps: MobileApp[];
  allTags: string[];
};

export function Catalog({ apps, allTags }: Props) {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  function clearTags() {
    setSelectedTags([]);
  }

  return (
    <section id="explorar-apps" className="mt-12 scroll-mt-24 sm:mt-16">
      <SectionTitle
        eyebrow="Explorar"
        title="Explorar apps"
        hint="Busca, filtra por etiqueta y abre cada ficha"
      />

      <div className="mt-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
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
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "app en esta lista" : "apps en esta lista"}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 rounded-3xl border border-dashed border-slate-300/90 bg-slate-50/80 px-8 py-14 text-center text-base text-slate-600 shadow-inner dark:border-slate-600/60 dark:bg-slate-900/40 dark:text-slate-400">
            Ninguna app coincide con tu búsqueda o filtros. Prueba otras
            palabras o quita etiquetas.
          </p>
        )}
      </div>
    </section>
  );
}
