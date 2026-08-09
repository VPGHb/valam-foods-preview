# VALAM FOODS launch checklist

## 1. Domain and permanent hosting

- Create a Cloudflare account owned by VALAM FOODS. Add the owner and developer as separate administrators.
- Check the live availability and renewal price of the preferred domain immediately before purchase.
- Recommended names to check: `valamfoods.com`, `valamfoodsusa.com`, and `valamfoodsiselin.com`.
- Register the domain in the business owner's name and enable automatic renewal.
- Deploy this repository to Cloudflare Workers in the business account.
- Create and bind a D1 database as `DB` and an R2 bucket as `MEDIA`.
- Add the production environment variables from `.env.example` using Cloudflare's secret manager.
- Attach the final domain and redirect the `www` version to the preferred canonical domain.
- Protect `/admin*` with Cloudflare Access and allow only approved email addresses. One-time email PIN is preferred so there is no external password to remember.
- Confirm public pages remain accessible without authentication.

## 2. Backups and recovery

- In Menu Manager, download a JSON backup before major menu edits or imports.
- Generate recovery codes and store them in the business password manager. Generating a new set invalidates the previous set.
- Test one recovery code before handing the site to the client. A successful reset invalidates the remaining codes and active admin sessions.
- Keep the R2 media bucket private and serve images only through the website media route.
- Use D1 Time Travel for point-in-time database recovery. Record the recovery procedure in the business password manager.
- For retention beyond the platform recovery window, schedule a D1 export to R2 after moving to the business Cloudflare account.

## 3. Search launch

- Keep `PUBLIC_SEARCH_INDEXING=disabled` until the final domain, menu, hours, legal copy and contact details are approved.
- Add the final domain as a Domain property in Google Search Console and verify it with the DNS TXT record.
- Add the Google verification value as `GOOGLE_SITE_VERIFICATION`.
- Add the site to Bing Webmaster Tools, preferably by importing the verified Google Search Console property.
- Add the Bing verification value as `BING_SITE_VERIFICATION` if manual verification is used.
- Set `PUBLIC_SEARCH_INDEXING=enabled` and deploy.
- Confirm `/robots.txt` allows crawling and references `/sitemap.xml`.
- Submit `/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
- Inspect the home page URL in both webmaster tools and request indexing once.
- Update the verified Google Business Profile with the final website URL, exact hours, phone number, menu link and current photos.
- Keep the same business name, address and phone number on the website, Google Business Profile, Bing Places and social profiles.
- Test the Restaurant structured data with Google's Rich Results Test after launch.

## 4. Final ownership handoff

- Replace the temporary administrator password.
- Add the client's email to `ADMIN_EMAILS` and the Cloudflare Access policy.
- Transfer primary ownership of the domain, Cloudflare account, Google Business Profile and webmaster accounts to the business owner.
- Store recovery codes, billing details and renewal dates in the client's password manager.
