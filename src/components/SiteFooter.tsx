import { getContactEmail } from "@/lib/contact";

const contactEmail = getContactEmail();

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-slate-200/80 bg-white/50 py-10 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-950/40">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300/80 to-transparent dark:via-slate-600/50" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Simple<span className="text-primary dark:text-sky-400">Apps</span>
            </p>
            <p className="mt-1 max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Catálogo de apps móviles simples y enfocadas. Desarrolladas con
              ayuda de IA para el día a día.
            </p>
          </div>
          <div className="max-w-md">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Contacto
            </p>
            {contactEmail ? (
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Para dudas, comentarios o cualquier tema sobre las apps, escríbenos
                a{" "}
                <a
                  href={`mailto:${contactEmail}`}
                  className="font-semibold text-primary underline decoration-primary/30 underline-offset-2 transition hover:decoration-primary dark:text-sky-400 dark:decoration-sky-400/40 dark:hover:decoration-sky-300"
                >
                  {contactEmail}
                </a>
                .
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-500">
                Añade{" "}
                <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs dark:bg-slate-800">
                  NEXT_PUBLIC_CONTACT_EMAIL
                </code>{" "}
                en tu configuración para mostrar el correo de contacto aquí.
              </p>
            )}
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500 sm:text-left">
          © {new Date().getFullYear()} SimpleApps
        </p>
      </div>
    </footer>
  );
}
