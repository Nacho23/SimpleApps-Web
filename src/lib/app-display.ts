import type { AppLinks, Platform } from "@/types/app";

/** True si hay URL de App Store o Google Play (app publicada en tiendas). */
export function hasStoreListing(links: AppLinks): boolean {
  const appStore = links.app_store?.trim();
  const playStore = links.play_store?.trim();
  return Boolean(appStore) || Boolean(playStore);
}

const PLATFORM_ORDER: Platform[] = ["iOS", "Android", "Web"];

/** Texto tipo "iOS · Android" para mostrar en cards; null si no hay plataformas conocidas. */
export function formatPlatformAvailability(platforms: Platform[]): string | null {
  const sorted = [...platforms]
    .filter((p): p is Platform => PLATFORM_ORDER.includes(p))
    .sort((a, b) => PLATFORM_ORDER.indexOf(a) - PLATFORM_ORDER.indexOf(b));
  if (sorted.length === 0) return null;
  return sorted.join(" · ");
}
