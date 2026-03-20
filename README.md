# SimpleApps

A small [Next.js](https://nextjs.org) (App Router) + [Tailwind CSS](https://tailwindcss.com) site that catalogs mobile apps: cards on the home page, detail pages with screenshots and store links, search, and tag filters.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Data

Apps live in `src/data/apps.json`. Each entry includes `id`, `name`, `slug`, descriptions, `logo_url`, `screenshots`, `tags`, `pricing`, `platforms`, `links`, `release_date`, and optional `why_exists` and `privacy_policy` (renders `/apps/[slug]/privacidad` and shows a “Política de privacidad” link on the app page).

## Comentarios en la ficha de cada app

Los comentarios públicos se guardan en **Upstash Redis** (`UPSTASH_REDIS_REST_URL` y `UPSTASH_REDIS_REST_TOKEN`). Sin esas variables, el formulario ofrece envío por correo (`NEXT_PUBLIC_CONTACT_EMAIL`) o copiar al portapapeles.

## Idea suggestions (form)

Set `NEXT_PUBLIC_CONTACT_EMAIL` in `.env.local` so the home-page form opens the user’s mail client with a pre-filled message. If unset, submit copies the text to the clipboard instead.

## Theme

Light / dark mode applies the Tailwind `dark` class on `<html>`. The root layout sets an initial class from the `simpleapps-theme` cookie and, when the browser sends it, `Sec-CH-Prefers-Color-Scheme` (via `middleware.ts` + `Accept-CH`). The client keeps `localStorage`, the DOM and the cookie in sync (`ThemeProvider`, `src/lib/theme.ts`). No theme `<script>` tags (React 19–friendly).

## Deploy

Works on [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com) with the default Next.js adapter. Set `NEXT_PUBLIC_SITE_URL` to your production URL (e.g. `https://your-domain.com`) so Open Graph and `metadataBase` resolve correctly.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production server
- `npm run lint` — ESLint
