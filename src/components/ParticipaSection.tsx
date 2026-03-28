import { getContactEmail } from "@/lib/contact";
import { SectionTitle } from "./SectionTitle";
import { SuggestionForm } from "./SuggestionForm";

export function ParticipaSection() {
  const contactEmail = getContactEmail();
  return (
    <section className="mt-16 sm:mt-20">
      <SectionTitle
        eyebrow="Participa"
        title="¿Qué app te gustaría que hiciéramos?"
        hint="Tu idea llega directo a mi correo"
      />
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Cuéntame qué problema resolverías, para quién sería útil o qué app
        necesitas. Leo todas las sugerencias y me ayudan a priorizar qué
        construir después.
      </p>
      <SuggestionForm contactEmail={contactEmail} />
    </section>
  );
}
