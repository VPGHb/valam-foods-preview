# VALAM FOODS production checklist

## 1. Business information

- Confirm the menu, prices, quantities, hours, phone number, address, reviews,
  allergy notice, legal copy, and social links with the business.
- Add final food photos under `public/foods/` as they become available.

## 2. Domain and deployment (complete)

- Create a GitHub repository owned by VALAM FOODS and keep a local clone.
- The official domain is `https://valamfood.com` and Cloudflare deploys from
  the `main` branch.
- Keep automatic renewal, registrar lock, two-factor authentication and DNSSEC enabled.
- Keep `www.valamfood.com` redirected to the canonical apex domain.

## 3. Search operations

- Keep the production website indexable and the GitHub fallback copy `noindex`.
- Keep the domain verified in Google Search Console and Bing Webmaster Tools.
- Monitor `/sitemap.xml` in both webmaster tools after significant updates.
- Add the final website and menu URL to the verified Google Business Profile.
- Keep the same business name, address, phone, and hours everywhere online.
- Test the Restaurant structured data with Google's Rich Results Test.

## 4. Updating and recovery

- Edit the local files, preview with `npm run dev`, and verify with `npm test`.
- Commit and push; Git-connected hosting publishes the update automatically.
- Restore an earlier Git commit and redeploy if a change needs to be undone.
- Keep an additional local or external copy of the repository.
