# VALAM FOODS Iselin website

A fully static website for VALAM FOODS in Iselin, New Jersey. It has no admin
dashboard, database, login, server-side storage, or runtime secrets.

## Quick access

- **[Open the production website](https://valamfood.com/)**
- [Check deployment progress](https://github.com/VPGHb/valam-foods-preview/actions)

`https://valamfood.com` is the official and canonical public website. Cloudflare
automatically deploys updates from the `main` branch.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Update the website

- Edit menu items, prices, quantities, and descriptions in `app/page.tsx`.
- Every menu item has its own illustration in `public/menu-items/`.
- Add approved food photos under `public/foods/`, then set an item's `imageUrl`
  to a path such as `/foods/samosa.jpg` to replace its illustration.
- Run `npm test` before publishing.

## Deploy

`npm run build` creates the static site in `dist/client/`. Cloudflare deploys
that output to the official domain.

The included GitHub Pages workflow maintains a non-indexable technical fallback.
Git history and a local clone provide recovery without a separate backup service.
