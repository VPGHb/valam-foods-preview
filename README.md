# VALAM FOODS Iselin website

A fully static website for VALAM FOODS in Iselin, New Jersey. It has no admin
dashboard, database, login, server-side storage, or runtime secrets.

## Local development

Requires Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

## Update the website

- Edit menu items, prices, quantities, and descriptions in `app/page.tsx`.
- Every menu item has its own clearly labeled illustration in
  `public/menu-items/` until an approved dish photo is available.
- Add approved food photos under `public/foods/`, then set an item's `imageUrl`
  to a path such as `/foods/samosa.jpg` to replace its illustration.
- Update the final domain and search-indexing launch switch in
  `lib/site-config.ts`, `public/robots.txt`, and `public/sitemap.xml`.
- Run `npm test` before publishing.

## Deploy

`npm run build` creates the static site in `dist/client/`. Deploy that folder to
Cloudflare Pages, GitHub Pages, Netlify, or any ordinary static web host.

With Git-connected hosting, pushing a commit automatically rebuilds and
publishes the website. Git history and a local clone provide recovery without
a separate backup service.
