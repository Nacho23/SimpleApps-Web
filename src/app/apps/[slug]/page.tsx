import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppLogoImage } from "@/components/AppLogoImage";
import { getAllSlugs, getAppBySlug } from "@/lib/apps";
import { AppCommentsSection } from "@/components/AppCommentsSection";
import {
  isCommentsStorageConfigured,
  listCommentsForSlug,
} from "@/lib/app-comments";
import { AiBadge } from "@/components/AiBadge";
import type { MobileApp } from "@/types/app";

type Props = { params: Promise<{ slug: string }> };

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

function buildMetadata(app: MobileApp): Metadata {
  const description = app.description_short;
  return {
    title: app.name,
    description,
    openGraph: {
      title: app.name,
      description,
      type: "website",
      images: [
        {
          url: app.logo_url,
          width: 512,
          height: 512,
          alt: `Logotipo de ${app.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: app.name,
      description,
      images: [app.logo_url],
    },
  };
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) return { title: "App no encontrada" };
  return buildMetadata(app);
}

export default async function AppDetailPage({ params }: Props) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app) notFound();

  const comments = await listCommentsForSlug(slug);
  const storageConfigured = isCommentsStorageConfigured();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/"
        className="group inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-primary transition hover:text-indigo-600 dark:text-sky-400 dark:hover:text-sky-300"
      >
        <span className="transition group-hover:-translate-x-0.5">←</span>
        Volver al catálogo
      </Link>

      <header className="relative mt-10 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-xl shadow-slate-900/[0.05] ring-1 ring-white/60 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/60 dark:shadow-black/40 dark:ring-slate-800/50 sm:p-8">
        <div className="pointer-events-none absolute -right-16 top-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl dark:bg-primary/20" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl sm:mx-0">
            <AppLogoImage
              src={app.logo_url}
              alt={`Logotipo de ${app.name}`}
              sizes="112px"
              priority
            />
          </div>
          <div className="min-w-0 flex-1 text-center sm:text-left">
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                {app.name}
              </h1>
              {app.uses_ai ? <AiBadge /> : null}
            </div>
            <p className="mt-3 text-base font-medium leading-snug text-slate-800 dark:text-slate-200 sm:text-lg">
              {app.description_short}
            </p>
            <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {app.description_long}
            </p>
          </div>
        </div>
      </header>

      <section className="mt-12">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 to-slate-300 dark:via-slate-600 dark:to-slate-600" />
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Capturas
          </h2>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-300 to-slate-300 dark:via-slate-600 dark:to-slate-600" />
        </div>
        <div className="mt-6 flex gap-5 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:thin]">
          {app.screenshots.map((src, i) => (
            <div
              key={src}
              className="group relative h-[300px] w-[150px] shrink-0 overflow-hidden rounded-2xl bg-slate-100 shadow-lg shadow-slate-900/10 ring-1 ring-slate-200/80 dark:bg-slate-800 dark:shadow-black/50 dark:ring-slate-700 sm:h-[340px] sm:w-[170px]"
            >
              <Image
                src={src}
                alt={`Captura ${i + 1} de ${app.name}`}
                fill
                sizes="170px"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-900/[0.04] ring-1 ring-white/50 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/55 dark:shadow-black/35 dark:ring-slate-800/40 sm:p-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-sky-400">
          Ficha de la app
        </h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/50">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Lanzamiento
            </dt>
            <dd className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
              {formatDate(app.release_date)}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Plataformas
            </dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {app.platforms.map((p) => (
                <span
                  key={p}
                  className="rounded-xl border border-slate-200/90 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                >
                  {p}
                </span>
              ))}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Etiquetas
            </dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {app.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-xl bg-gradient-to-r from-primary/10 to-indigo-500/10 px-3 py-1.5 text-sm font-semibold text-primary ring-1 ring-primary/20 dark:from-sky-500/15 dark:to-indigo-500/15 dark:text-sky-300 dark:ring-sky-500/25"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {app.links.app_store && (
            <a
              href={app.links.app_store}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/25 transition hover:brightness-110 dark:from-white dark:to-slate-100 dark:text-slate-900 dark:shadow-white/10"
            >
              Descargar en App Store
            </a>
          )}
          {app.links.play_store && (
            <a
              href={app.links.play_store}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200/90 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 shadow-md transition hover:border-primary/30 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-sky-500/40 dark:hover:bg-slate-800/90"
            >
              Consíguela en Google Play
            </a>
          )}
          {app.privacy_policy && (
            <Link
              href={`/apps/${app.slug}/privacidad`}
              className="inline-flex flex-1 items-center justify-center rounded-2xl border border-slate-200/90 bg-slate-50/80 px-6 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition hover:border-primary/25 hover:bg-white hover:text-primary dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-sky-500/40 dark:hover:bg-slate-800 dark:hover:text-sky-300"
            >
              Política de privacidad
            </Link>
          )}
        </div>
      </section>

      <AppCommentsSection
        appName={app.name}
        appSlug={app.slug}
        initialComments={comments}
        storageConfigured={storageConfigured}
      />

      {app.why_exists && (
        <section className="mt-10 rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/90 via-white to-sky-50/80 p-6 shadow-lg shadow-indigo-900/[0.04] dark:border-indigo-500/20 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 dark:shadow-black/30 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Por qué existe esta app
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
            {app.why_exists}
          </p>
        </section>
      )}
    </article>
  );
}
