import { SectionTitle } from "./SectionTitle";

const PLATFORM_KEYS = "https://platform.openai.com/api-keys";
const PLATFORM_BILLING = "https://platform.openai.com/settings/organization/billing/overview";

export function OpenAiKeyGuide() {
  return (
    <section
      id="clave-openai"
      className="mt-16 scroll-mt-24 sm:mt-20"
      aria-labelledby="heading-clave-openai"
    >
      <SectionTitle
        eyebrow="OpenAI"
        title="Cómo obtener tu clave de API"
        hint="Una clave para todas las apps con IA"
      />

      <div className="mt-6 space-y-6 rounded-3xl border border-slate-200/80 bg-white/70 p-6 shadow-lg shadow-slate-900/[0.03] ring-1 ring-white/60 backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/55 dark:shadow-black/25 dark:ring-slate-800/50 sm:p-8">
        <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
          Las apps con badge{" "}
          <span className="inline-flex items-center rounded-full bg-violet-500/12 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-violet-800 ring-1 ring-violet-500/25 dark:text-violet-200">
            IA
          </span>{" "}
          no envían tu conversación a nuestros servidores para procesarla: tú
          enlazas tu cuenta de OpenAI con una{" "}
          <strong className="font-semibold text-slate-800 dark:text-slate-200">
            clave secreta de API
          </strong>{" "}
          que generas en el panel de OpenAI. Esa clave es la que también se usa
          oficialmente para los modelos tipo GPT en la API (no es tu contraseña
          de la web de ChatGPT, sino un token de acceso a la API).
        </p>

        <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/80 px-4 py-3 dark:border-emerald-500/25 dark:bg-emerald-950/35">
          <p className="text-sm font-medium leading-relaxed text-emerald-950 dark:text-emerald-100">
            <strong className="font-bold">Importante:</strong> la misma clave de
            API te vale para{" "}
            <strong className="font-bold">todas las apps SimpleApps</strong>{" "}
            que usan IA (por ejemplo Zplit y GymTrackAI). Solo tienes que
            pegarla en el perfil o ajustes de cada app; no necesitas una clave
            distinta por app.
          </p>
        </div>

        <ol className="list-decimal space-y-4 pl-5 text-slate-700 dark:text-slate-300">
          <li className="pl-1">
            <span className="font-semibold text-slate-900 dark:text-white">
              Crea o entra en tu cuenta de OpenAI
            </span>
            . Ve a{" "}
            <a
              href={PLATFORM_KEYS}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-2 hover:underline dark:text-sky-400"
            >
              platform.openai.com
            </a>{" "}
            e inicia sesión (o regístrate).
          </li>
          <li className="pl-1">
            <span className="font-semibold text-slate-900 dark:text-white">
              Abre la sección de claves de API
            </span>
            . En el menú de desarrolladores, entra en{" "}
            <strong className="font-medium">API keys</strong> (enlaces directos
            cambian con el tiempo; suele estar en{" "}
            <em>Dashboard → API keys</em>).
          </li>
          <li className="pl-1">
            <span className="font-semibold text-slate-900 dark:text-white">
              Crea una clave nueva
            </span>
            . Pulsa algo como{" "}
            <strong className="font-medium">&quot;Create new secret key&quot;</strong>
            , ponle un nombre que reconozcas (p. ej. &quot;SimpleApps
            móvil&quot;) y copia el valor{" "}
            <strong className="font-medium">en ese momento</strong>: OpenAI
            suele mostrar el secreto completo solo una vez.
          </li>
          <li className="pl-1">
            <span className="font-semibold text-slate-900 dark:text-white">
              Activa facturación o créditos si hace falta
            </span>
            . El uso de la API es de pago según consumo; revisa{" "}
            <a
              href={PLATFORM_BILLING}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline-offset-2 hover:underline dark:text-sky-400"
            >
              facturación en OpenAI
            </a>{" "}
            y los precios vigentes en su web. Sin saldo o método de pago
            válido, las llamadas pueden fallar.
          </li>
          <li className="pl-1">
            <span className="font-semibold text-slate-900 dark:text-white">
              Pégala en la app
            </span>
            . En cada app con IA, busca la pantalla de perfil o ajustes donde se
            configura la clave, pégala y guarda. Trátala como una contraseña: no
            la compartas ni la subas a redes o repositorios públicos.
          </li>
        </ol>

        <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          OpenAI puede cambiar su interfaz y condiciones en cualquier momento;
          si algo no coincide con lo anterior, prioriza la documentación oficial
          en su web.
        </p>
      </div>
    </section>
  );
}
