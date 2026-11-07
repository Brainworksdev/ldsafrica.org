/**
 * Image optimiser: converts originals in brand-source/photos/*.jpg into
 * responsive WebP files in public/assets/img/, and writes tiny blurred
 * placeholders to src/lqip.json (shown instantly while each photo loads).
 *
 * Usage (sharp is installed temporarily, not added to package.json):
 *   npm i --no-save sharp
 *   node scripts/optimise-images.cjs
 *
 * To replace a photo: overwrite brand-source/photos/<name>.jpg, run the
 * script, update width/height/alt in src/content.mjs if proportions changed,
 * then `npm run build`.
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'brand-source', 'photos');
const OUT = path.join(ROOT, 'public', 'assets', 'img');
const LQIP = path.join(ROOT, 'src', 'lqip.json');

// Output widths and WebP quality per image group. Keep in sync with WIDTHS in src/partials.mjs.
const PROFILES = {
  banner: { widths: [600, 900, 1400, 2000], quality: 62 },
  photo: { widths: [500, 800, 1200], quality: 64 },
  lang: { widths: [400, 640, 900], quality: 58 },
};
const profileFor = (name) =>
  name.startsWith('lang-') ? PROFILES.lang : ['hero-training-room', 'about-banner'].includes(name) ? PROFILES.banner : PROFILES.photo;

// Optional crops (applied before resizing), e.g. to turn a tall photo into a square.
const CROPS = {
  'lang-french': (m) => ({ left: 0, top: Math.round(m.height * 0.03), width: m.width, height: Math.round(m.width * 0.75) }),
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const lqip = {};
  let total = 0;
  for (const file of fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f)).sort()) {
    const name = file.replace(/\.jpe?g$/i, '');
    const { widths, quality } = profileFor(name);
    const meta = await sharp(path.join(SRC, file)).metadata();
    const base = () => {
      const s = sharp(path.join(SRC, file)).rotate();
      return CROPS[name] ? s.extract(CROPS[name](meta)) : s;
    };

    // remove stale sizes for this image
    for (const old of fs.readdirSync(OUT)) if (old.startsWith(name + '-') && /-\d+\.webp$/.test(old)) fs.unlinkSync(path.join(OUT, old));

    const sizes = [];
    for (const w of widths) {
      const info = await base().resize({ width: w, withoutEnlargement: true }).webp({ quality, effort: 6, smartSubsample: true }).toFile(path.join(OUT, `${name}-${w}.webp`));
      sizes.push(`${w}:${Math.round(info.size / 1024)}KB`);
      total += info.size;
    }
    const tiny = await base().resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer();
    lqip[name] = `data:image/webp;base64,${tiny.toString('base64')}`;
    console.log(name.padEnd(24), sizes.join('  '));
  }
  fs.writeFileSync(LQIP, JSON.stringify(lqip, null, 2) + '\n');
  console.log(`\nTotal ${Math.round(total / 1024)}KB. Placeholders written to src/lqip.json`);
})();
