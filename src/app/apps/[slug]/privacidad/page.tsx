import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAppBySlug, getSlugsWithPrivacyPolicy } from "@/lib/apps";
import type { MobileApp } from "@/types/app";

type Props = { params: Promise<{ slug: string }> };

function formatUpdated(iso: string) {
  return new Intl.DateTimeFormat("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

function buildPrivacyMetadata(app: MobileApp): Metadata {
  const title = `Política de privacidad · ${app.name}`;
  const description = `Información sobre privacidad y tratamiento de datos en ${app.name}.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  return getSlugsWithPrivacyPolicy().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app?.privacy_policy) return { title: "Política de privacidad" };
  return buildPrivacyMetadata(app);
}

export default async function AppPrivacyPage({ params }: Props) {
  const { slug } = await params;
  const app = getAppBySlug(slug);
  if (!app?.privacy_policy) notFound();

  const { updated_at, sections } = app.privacy_policy;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href={`/apps/${app.slug}`}
        className="group inline-flex items-center gap-2 rounded-xl text-sm font-semibold text-primary transition hover:text-indigo-600 dark:text-sky-400 dark:hover:text-sky-300"
      >
        <span className="transition group-hover:-translate-x-0.5">←</span>
        Volver a {app.name}
      </Link>

      <header className="mt-10 border-b border-slate-200/80 pb-8 dark:border-slate-800/80">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
          {app.name}
        </p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Política de privacidad
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Última actualización: {formatUpdated(updated_at)}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {section.title}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
