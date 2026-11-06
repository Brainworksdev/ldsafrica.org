import { site, languages, learningModes, whatsappLink } from '../content.mjs';
import { head, header, footer, picture, icon, eyebrow, esc, visionMission, contactSection } from '../partials.mjs';

/** Woven-pattern motif used for the African Languages card instead of a single greeting. */
const wovenMotif = `<svg class="lang-card__weave" viewBox="0 0 120 40" aria-hidden="true" focusable="false">
  <g fill="none" stroke-width="4">
    <path d="M0 6h120" stroke="#F5A400"/><path d="M0 20h120" stroke="#10377F"/><path d="M0 34h120" stroke="#F5A400"/>
  </g>
  <g fill="#10377F"><rect x="6" y="10" width="10" height="6"/><rect x="36" y="10" width="10" height="6"/><rect x="66" y="10" width="10" height="6"/><rect x="96" y="10" width="10" height="6"/></g>
  <g fill="#F5A400"><rect x="21" y="24" width="10" height="6"/><rect x="51" y="24" width="10" height="6"/><rect x="81" y="24" width="10" height="6"/><rect x="111" y="24" width="9" height="6"/></g>
</svg>`;

const languageCard = (l, i) => `
<li class="lang-card" data-reveal>
  <a class="lang-card__link" href="/about/#${l.slug}">
    <span class="lang-card__index">${String(i + 1).padStart(2, '0')}</span>
    <span class="lang-card__greeting"${l.greeting ? ` lang="${l.greeting.lang}"` : ''} aria-hidden="true">${l.greeting ? esc(l.greeting.text) : wovenMotif}</span>
    <h3 class="lang-card__name">${esc(l.name)}</h3>
    <p class="lang-card__text">${esc(l.summary)}</p>
    <span class="lang-card__more">Learn more ${icon('arrow')}</span>
  </a>
</li>`;

const modeCard = (m) => `
<article class="mode-card" data-reveal>
  <div class="mode-card__media">${picture(m.image, { sizes: '(min-width: 900px) 560px, 100vw' })}</div>
  <div class="mode-card__body">
    <span class="mode-card__icon">${icon(m.icon)}</span>
    <p class="mode-card__label">${esc(m.label)}</p>
    <h3 class="mode-card__title">${esc(m.title)}</h3>
    <p>${esc(m.description)}</p>
  </div>
</article>`;

export default () => {
  const title = 'LDSTAR Africa Language Centre | Language Training in Africa';
  const description =
    'Learn English, Kiswahili, African languages, German, Spanish, French or Chinese with LDSTAR Africa Language Centre. Language training for professionals, academics and individuals — in person or online.';

  return `${head({ title, description, path: '/', page: 'home', preloadImage: 'hero-training-room' })}
<body>
${header('home')}
<main id="main">

  <!-- Hero -->
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__media">${picture(
      { file: 'hero-training-room', width: 2000, height: 1335, alt: 'Adult learners taking part in a training session in a modern, light-filled classroom', position: '60% center' },
      { eager: true }
    )}</div>
    <div class="container hero__inner">
      <div class="hero__content">
        ${eyebrow(site.name, true)}
        <h1 class="hero__title" id="hero-title">Connecting Africa to the World Through <span class="hl">Language.</span></h1>
        <p class="hero__lead">Develop the language skills to communicate confidently, connect across cultures and participate in a global society. LDSTAR Africa Language Centre provides language training for professionals, academics and individuals.</p>
        <div class="btn-row">
          <a class="btn btn--gold btn--lg" href="#languages">Explore Our Languages ${icon('arrow')}</a>
          <a class="btn btn--ghost btn--lg" href="#contact">Get in Touch</a>
        </div>
      </div>
    </div>
    <div class="hero__strip">
      <div class="container hero__strip-inner">
        <p class="hero__strip-label">Languages offered</p>
        <ul class="hero__strip-list" role="list">
          ${languages.map((l) => `<li><a href="/about/#${l.slug}">${esc(l.name)}</a></li>`).join('')}
        </ul>
      </div>
    </div>
  </section>

  <!-- Introduction -->
  <section class="section intro" id="about" aria-labelledby="intro-title">
    <div class="container intro__grid">
      <div class="intro__media" data-reveal>
        ${picture({ file: 'study-together', width: 1200, height: 800, alt: 'Two learners studying together with books in a library' }, { sizes: '(min-width: 900px) 50vw, 100vw' })}
      </div>
      <div class="intro__text" data-reveal>
        ${eyebrow('About us')}
        <h2 class="section-title" id="intro-title">Welcome to LDSTAR Africa Language Centre</h2>
        <p class="section-lead">LDSTAR Africa Language Centre is dedicated to disseminating language knowledge and skills to professionals and members of academia. Through training in local, African and international languages, we aim to strengthen communication, cultural understanding and global engagement.</p>
        <p class="intro__motto">Learn a language. <span>Expand your world.</span></p>
        <a class="text-link" href="/about/">More about LDSTAR Africa ${icon('arrow')}</a>
      </div>
    </div>
  </section>

  <!-- Languages -->
  <section class="section section--tint" id="languages" aria-labelledby="languages-title">
    <div class="container">
      <div class="section-head" data-reveal>
        ${eyebrow('Language programmes')}
        <h2 class="section-title" id="languages-title">Explore Our Languages</h2>
        <p class="section-lead">Discover opportunities to learn languages that connect communities, cultures and the wider world.</p>
      </div>
      <ul class="lang-grid" role="list">
        ${languages.map(languageCard).join('')}
        <li class="lang-card lang-card--cta" data-reveal>
          <div class="lang-card__link">
            <span class="lang-card__cta-icon">${icon('chat')}</span>
            <h3 class="lang-card__name">Not sure where to start?</h3>
            <p class="lang-card__text">Talk to us about the language that best fits your professional, academic or personal goals.</p>
            <a class="btn btn--gold btn--sm" href="${whatsappLink()}" target="_blank" rel="noopener">${icon('whatsapp')}Ask on WhatsApp</a>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <!-- Learning modes -->
  <section class="section" id="learning-modes" aria-labelledby="modes-title">
    <div class="container">
      <div class="section-head section-head--split" data-reveal>
        <div>
          ${eyebrow('Learning modes')}
          <h2 class="section-title" id="modes-title">Flexible Learning, Designed Around You</h2>
        </div>
        <p class="section-lead">Learners can access LDSTAR Africa language training in person or online — choose the mode that suits your schedule and location.</p>
      </div>
      <div class="mode-grid">
        ${learningModes.map(modeCard).join('')}
      </div>
    </div>
  </section>

  ${visionMission()}

  ${contactSection({
    title: 'Your Language Journey Starts Here.',
    text: 'Take the next step towards developing your language skills. Connect with LDSTAR Africa Language Centre to enquire about available training opportunities.',
  })}

</main>
${footer()}`;
};
