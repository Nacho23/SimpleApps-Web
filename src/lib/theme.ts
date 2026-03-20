/** Misma clave en `localStorage`, cookie y `ThemeProvider`. */
export const THEME_STORAGE_KEY = "simpleapps-theme";

const SEC_CH_DARK = "dark";
const SEC_CH_LIGHT = "light";

/**
 * Tema inicial en el HTML servido (sin `<script>`).
 * Cookie gana sobre `Sec-CH-Prefers-Color-Scheme` cuando el modo es explícito.
 */
export function readInitialDarkFromRequest(
  themeCookie: string | undefined,
  secChPrefersColorScheme: string | null,
): boolean {
  if (themeCookie === "dark") return true;
  if (themeCookie === "light") return false;
  const v = secChPrefersColorScheme?.toLowerCase();
  if (v === SEC_CH_DARK) return true;
  if (v === SEC_CH_LIGHT) return false;
  return false;
}

/** Sincroniza cookie para que el siguiente documento HTML coincida con la preferencia. */
export function syncThemePreferenceCookie(value: string): void {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${THEME_STORAGE_KEY}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
}
