export type Pricing = "free" | "paid" | "freemium";

export type Platform = "iOS" | "Android" | "Web";

export type AppLinks = {
  app_store?: string;
  play_store?: string;
};

/** Contenido de la página `/apps/[slug]/privacidad`. */
export type PrivacyPolicySection = {
  title: string;
  /** Párrafos; cada string es un párrafo. */
  paragraphs: string[];
};

export type PrivacyPolicy = {
  /** Fecha ISO (YYYY-MM-DD) para mostrar “Última actualización”. */
  updated_at: string;
  sections: PrivacyPolicySection[];
};

export type MobileApp = {
  id: string;
  name: string;
  slug: string;
  description_short: string;
  description_long: string;
  logo_url: string;
  screenshots: string[];
  tags: string[];
  pricing: Pricing;
  platforms: Platform[];
  links: AppLinks;
  release_date: string;
  /** Incluye funciones de inteligencia artificial (muestra badge en el catálogo). */
  uses_ai?: boolean;
  why_exists?: string;
  privacy_policy?: PrivacyPolicy;
};
