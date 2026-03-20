export type Pricing = "free" | "paid" | "freemium";

export type Platform = "iOS" | "Android" | "Web";

export type AppLinks = {
  app_store?: string;
  play_store?: string;
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
  why_exists?: string;
};
