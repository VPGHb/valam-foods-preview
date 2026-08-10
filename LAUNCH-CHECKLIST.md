# VALAM FOODS static-site launch checklist

## 1. Approvals

- Confirm the menu, prices, quantities, hours, phone number, address, reviews,
  allergy notice, legal copy, and social links with the business.
- Replace the demo notice once VALAM FOODS approves the website as official.
- Add final food photos under `public/foods/` as they become available.

## 2. Domain and deployment

- Create a GitHub repository owned by VALAM FOODS and keep a local clone.
- Connect the repository to Cloudflare Pages and use `npm run build` with
  `out` as the output folder.
- Buy the domain in the business owner's name and enable automatic renewal.
- Attach the custom domain and redirect `www` to the preferred address.
- Update the domain in `lib/site-config.ts`, `public/robots.txt`, and
  `public/sitemap.xml` to the final HTTPS domain.

## 3. Search launch

- Keep `INDEXING_ENABLED` set to `false` until the business approves launch.
- Change it to `true`, replace `Disallow: /` with `Allow: /` in
  `public/robots.txt`, rebuild, and confirm `/robots.txt` allows crawling.
- Verify the domain in Google Search Console and Bing Webmaster Tools using
  their DNS records.
- Submit `/sitemap.xml` to both webmaster tools.
- Add the final website and menu URL to the verified Google Business Profile.
- Keep the same business name, address, phone, and hours everywhere online.
- Test the Restaurant structured data with Google's Rich Results Test.

## 4. Updating and recovery

- Edit the local files, preview with `npm run dev`, and verify with `npm test`.
- Commit and push; Git-connected hosting publishes the update automatically.
- Restore an earlier Git commit and redeploy if a change needs to be undone.
- Keep an additional local or external copy of the repository.
