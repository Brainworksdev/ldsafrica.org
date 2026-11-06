/**
 * Static site build — no dependencies required.
 *   node build.mjs   →  renders src/pages/* and copies public/* into dist/
 */
import { rm, mkdir, cp, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site, contact } from './src/content.mjs';
import home from './src/pages/home.mjs';
import about from './src/pages/about.mjs';

const OUT = 'dist';

// Pages: [output path, renderer, sitemap priority]
const pages = [
  ['/', home, '1.0'],
  ['/about/', about, '0.8'],
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
await cp('public', OUT, { recursive: true });

for (const [path, render] of pages) {
  const dir = join(OUT, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), render().trim() + '\n');
}

// 404 page reuses the homepage shell via a lightweight standalone document
await writeFile(
  join(OUT, '404.html'),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Page not found | ${site.name}</title><meta name="robots" content="noindex"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="/assets/css/styles.css"></head><body class="notfound"><main class="container notfound__inner"><img src="/assets/brand/logo.png" alt="${site.name}" width="320" height="165"><h1 class="section-title">Page not found</h1><p class="section-lead">The page you are looking for does not exist or has moved.</p><div class="btn-row btn-row--center"><a class="btn btn--gold" href="/">Go to homepage</a><a class="btn btn--outline" href="/about/">About &amp; Programmes</a></div></main></body></html>\n`
);

const today = new Date().toISOString().slice(0, 10);
await writeFile(
  join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([p, , pr]) => `  <url><loc>${site.url}${p}</loc><lastmod>${today}</lastmod><priority>${pr}</priority></url>`).join('\n')}
</urlset>
`
);

await writeFile(join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

await writeFile(
  join(OUT, 'site.webmanifest'),
  JSON.stringify(
    {
      name: site.name,
      short_name: site.shortName,
      start_url: '/',
      display: 'browser',
      background_color: '#FFFFFF',
      theme_color: '#10377F',
      icons: [
        { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    },
    null,
    2
  ) + '\n'
);

console.log(`Built ${pages.length} pages into ./${OUT}`);
if (!contact.email.confirmed) {
  console.warn(`\n⚠  Email address is still a placeholder: ${contact.email.address}\n   Update contact.email in src/content.mjs and set confirmed: true before launch.\n`);
}
