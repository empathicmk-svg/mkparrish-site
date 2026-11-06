# TresBelle Aesthetics — website

Marketing site for **Très Belle Aesthetics** ([booking](https://tresbelle.glossgenius.com/) · [Instagram](https://www.instagram.com/tres.belle.aesthetics/)).

Built on the same stack and type system as mkparrish.com:

| | |
|---|---|
| Framework | Next.js 16 (App Router, fully static), React 19, TypeScript strict |
| Styling | Tailwind CSS v4 with tokens in `app/globals.css` |
| Display | Bebas Neue |
| Serif accents | Playfair Display italic |
| Body | DM Sans |
| Labels | JetBrains Mono |
| Palette | warm noir × champagne × blush |

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
npm run lint && npm run typecheck
```

## Edit content

Everything the site says lives in **`content/site.ts`**: services, prices, durations, policies, address, hours and phone. Components only render that file.

The content comes from TresBelle's public GlossGenius page (pulled 2026-11-06): services, durations, address, phone, hours, team and the cancellation policy. Prices hidden on GlossGenius show as **See booking**. Only the publicly listed ones (Plasma Injections, Fibroblast, Stem Cell Microchanneling) show a figure.

Still to confirm with the business:
- Late-cancel fee: their written policy says $50, but the GlossGenius fee setting says $20. The site uses $50.
- The production domain (`NEXT_PUBLIC_SITE_URL`).

## Structure

```
app/
  layout.tsx          fonts, metadata, nav, footer
  page.tsx            hero · marquee · services · approach · Instagram · visit
  policies/page.tsx
  components/         Nav (mobile drawer), Footer, Section, ServiceMenu, RevealObserver
  robots.ts, sitemap.ts, icon.svg, not-found.tsx
content/site.ts       all copy and data
```

## Deploy

1. **Vercel, from this monorepo:** create a new Vercel project, set **Root Directory** to `clients/tresbelle`, and add the env var `NEXT_PUBLIC_SITE_URL=https://<domain>`.
2. **Its own repo:** split this folder out with its history:
   ```bash
   git subtree split --prefix clients/tresbelle -b tresbelle-site
   git push git@github.com:<owner>/tresbelle-site.git tresbelle-site:main
   ```

The parent mkparrish.com typecheck and lint skip `clients/` (see the root `tsconfig.json` and `eslint.config.mjs`).
