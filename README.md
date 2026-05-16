# AppsDemo marketing site

Marketing site for [appsdemo.in](https://appsdemo.in) — built with [Astro](https://astro.build) + Tailwind CSS 4.

## Local development

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # static output → ./dist
npm run preview      # serve ./dist locally
```

## Project layout

```
src/
  components/   Reusable .astro components (Nav, Footer, Hero, ProductCard, …)
  data/
    site.ts     Site-wide config (name, URL, email, nav, form endpoint)
    products.ts List of products that drives the home grid + footer
  layouts/
    BaseLayout.astro   SEO meta + OG tags + JSON-LD wrapper
  pages/        File-based routing (index, products/travel-crm, pricing, …)
  styles/
    global.css  Tailwind import + theme tokens + utilities
public/         Static assets (favicon, robots.txt, OG images)
```

## Editing content

- **Branding (name, email, tagline):** [`src/data/site.ts`](src/data/site.ts)
- **Products on the home page:** [`src/data/products.ts`](src/data/products.ts)
- **Pricing plans:** [`src/pages/pricing.astro`](src/pages/pricing.astro) — keep these in sync with TravelERP's `SubscriptionPlans` table
- **Colors / fonts:** [`src/styles/global.css`](src/styles/global.css) (`@theme` block)

## Contact form

By default the form falls back to a `mailto:` link that opens the user's email client.
To use a form-handler service (recommended for production), set `formEndpoint` in
`src/data/site.ts` to your Web3Forms / Formspree / Netlify Forms URL.

## Deploy

Static output (`./dist`) deploys cleanly to:
- Cloudflare Pages (recommended — free, fast, easy DNS for appsdemo.in)
- Netlify
- Vercel
- GitHub Pages

Build command: `npm run build` · Output dir: `dist`
