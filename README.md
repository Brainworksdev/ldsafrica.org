# LDSTAR Africa Language Centre — Website

Official website for **LDSTAR Africa Language Centre**. It is a fast, static, two-page site with no runtime dependencies.

| Page | URL | Source |
|------|-----|--------|
| Home | `/` | `src/pages/home.mjs` |
| About & Language Programmes | `/about/` | `src/pages/about.mjs` |

## Quick start

Requires Node.js 18 or newer. There are no packages to install.

```bash
npm run build     # generates the site into ./dist
npm run serve     # preview at http://localhost:4173
npm start         # build + preview
```

## Editing content

All institutional content lives in **`src/content.mjs`**:

- `site`: name, domain, vision, mission, SEO description
- `contact`: phone, WhatsApp number, email
- `navigation`: menu items (shared by header and footer)
- `languages`: the seven language programmes (homepage cards and About page programme cards)
- `learningModes`: physical and online learning
- `focusAreas`: the five focus areas on the About page

Edit the file, then run `npm run build`. Changes appear on both pages automatically.

### Adding future content

The structure is designed to grow without a redesign:

- **Course levels, durations, schedules, fees:** add fields to each entry in `languages` (for example `levels: ['Beginner', …]`), then render them in `programmeCard()` in `src/pages/about.mjs`.
- **New sections** (FAQs, trainer profiles, testimonials, news): add a data array in `content.mjs` and a section in the relevant page file. Reuse existing classes such as `.section`, `.section-head`, `.eyebrow` and `.section-title`.
- **A new page:** create `src/pages/<name>.mjs`, register it in the `pages` list in `build.mjs` (which also adds it to the sitemap), and add it to `navigation`.

Shared components such as the header, footer, Vision & Mission panel and contact block are in `src/partials.mjs`.

## Project structure

```
src/
  content.mjs        ← all editable content
  partials.mjs       ← header, footer, <head>/SEO, icons, shared sections
  pages/home.mjs     ← homepage
  pages/about.mjs    ← About & Programmes page
public/              ← static files copied as-is into dist/
  assets/css/styles.css
  assets/js/main.js  ← mobile menu, scroll reveal, footer year
  assets/img/        ← optimised WebP photography (multiple widths)
  assets/brand/      ← logo (light/dark, transparent PNG), social share image
  favicon.svg, icons
build.mjs            ← renders pages, writes sitemap.xml, robots.txt, manifest, 404
serve.mjs            ← local preview server
dist/                ← build output: deploy this folder
brand-source/        ← original supplied logo file
```

## Images

Photos are stored as WebP in several widths so each device downloads only the size it needs:

- Banners: `<name>-600/900/1400/2000.webp`
- Section photos: `<name>-500/800/1200.webp`
- Language photos: `lang-<slug>-600/1000.webp`

To replace a photo, export it at the same widths and file names, and update `width`, `height` and `alt` in `content.mjs` if the proportions change. Sources and licences are listed in `CREDITS.md`.

## Deployment

The site is plain static HTML, so any static host works. **Deploy the `dist/` folder.**

- **cPanel / shared hosting:** run `npm run build` and upload the *contents* of `dist/` to `public_html/`.
- **Netlify / Cloudflare Pages / Vercel:** build command `npm run build`, output directory `dist`.
- **GitHub Pages:** publish `dist/` with a Pages workflow, or push `dist/` to a `gh-pages` branch.

`dist/.htaccess` (Apache) sets the 404 page, compression, caching and a www → bare-domain redirect. Other hosts ignore it.

### Before launch checklist

1. **Email address:** set `contact.email.address` in `src/content.mjs` and change `confirmed` to `true`. While it is `false`, the build prints a warning and the email is left out of the structured data.
2. **HTTPS:** the domain is `ldsafrica.org`, which currently serves only HTTP. Install an SSL certificate (cPanel → SSL/TLS Status → Run AutoSSL). Then:
   - change `site.url` in `src/content.mjs` to `https://ldsafrica.org`;
   - uncomment the HTTPS redirect in `public/.htaccess` and change the www rule to `https`.
3. Rebuild with `npm run build`, then upload the contents of `dist/` to `public_html/`. Include the hidden `.htaccess` file.
4. Submit `https://<domain>/sitemap.xml` in Google Search Console.

## Contact options and forms

The site has no enquiry form, because a form needs a backend to deliver messages. Every enquiry route works without one:

- **Call:** `tel:` links
- **WhatsApp:** `wa.me` links with a pre-filled message (each language has its own message)
- **Email:** `mailto:` links, which start working once the address is confirmed

If a form is wanted later, you can add a hosted form service (such as Formspree, Netlify Forms or Web3Forms) or a small server endpoint. Each of these needs an account or API key, and a verified recipient email.
