import { languages, learningModes, focusAreas, whatsappLink } from '../content.mjs';
import { head, header, footer, picture, icon, eyebrow, esc, visionMission, contactSection } from '../partials.mjs';

const programmeCard = (l) => `
<article class="programme" id="${l.slug}" data-reveal>
  <div class="programme__media">${picture(l.image, { sizes: '(min-width: 1100px) 260px, (min-width: 700px) 40vw, 100vw' })}</div>
  <div class="programme__body">
    <h3 class="programme__name">${esc(l.name)}${l.greeting ? ` <span class="programme__greeting" lang="${l.greeting.lang}">${esc(l.greeting.text)}</span>` : ''}</h3>
    <p>${esc(l.detail)}</p>
    <a class="btn btn--navy btn--sm" href="${whatsappLink(`Hello LDSTAR Africa Language Centre, I would like to enquire about ${l.name} training.`)}" target="_blank" rel="noopener">
      ${icon('whatsapp')}Enquire about ${esc(l.name)}
    </a>
  </div>
</article>`;

const deliveryColumn = (m) => `
<article class="delivery__col" data-reveal>
  <div class="delivery__media">${picture(m.aboutImage, { sizes: '(min-width: 900px) 560px, 100vw' })}</div>
  <div class="delivery__body">
    <div class="delivery__head">
      <span class="mode-card__icon">${icon(m.icon)}</span>
      <div>
        <p class="mode-card__label">${esc(m.label)}</p>
        <h3 class="mode-card__title">${esc(m.title)}</h3>
      </div>
    </div>
    <p>${esc(m.description)}</p>
    <ul class="checklist" role="list">
      ${m.points.map((p) => `<li>${icon('check')}${esc(p)}</li>`).join('')}
    </ul>
  </div>
</article>`;

export default () => {
  const title = 'About Us & Language Programmes | LDSTAR Africa Language Centre';
  const description =
    'About LDSTAR Africa Language Centre: our vision, mission and language programmes in English, Kiswahili, African languages, German, Spanish, French and Chinese — delivered in person and online.';

  return `${head({ title, description, path: '/about/', page: 'about', preloadImage: 'about-banner' })}
<body>
${header('about')}
<main id="main">

  <!-- Page banner -->
  <section class="page-banner" aria-labelledby="page-title">
    <div class="page-banner__media">${picture(
      { file: 'about-banner', width: 2000, height: 1334, alt: 'Learners gathered with books and laptops in a university library' },
      { eager: true }
    )}</div>
    <div class="container page-banner__inner">
      <nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li aria-current="page">About &amp; Programmes</li></ol></nav>
      <h1 class="page-banner__title" id="page-title">About LDSTAR Africa</h1>
      <p class="page-banner__lead">Building language skills for a connected world.</p>
    </div>
  </section>

  <!-- About the institution -->
  <section class="section" aria-labelledby="who-title">
    <div class="container about__grid">
      <div class="about__text" data-reveal>
        ${eyebrow('Who we are')}
        <h2 class="section-title" id="who-title">Language skills for professional, academic and global life</h2>
        <p class="section-lead">LDSTAR Africa Language Centre is a language training institution dedicated to disseminating language knowledge and skills to professionals and members of academia.</p>
        <p>We believe language is more than a subject of study. It is a practical skill that opens doors to professional growth, academic collaboration and meaningful connection across cultures. Our training brings together local, African and international languages, helping learners communicate with clarity and confidence in their work, studies and communities.</p>
        <p>Guided by our vision of becoming a premier language institution in Africa, we offer training in global languages through both physical and online learning — so that learners can develop their skills in the way that suits them best.</p>
      </div>
      <div class="about__media" data-reveal>
        ${picture({ file: 'professionals-meeting', width: 1200, height: 801, alt: 'Professionals in discussion around a meeting table' }, { sizes: '(min-width: 900px) 45vw, 100vw' })}
      </div>
    </div>
    <div class="container">
      <ul class="focus-grid" role="list">
        ${focusAreas
          .map(
            (f) => `<li class="focus" data-reveal><span class="focus__icon">${icon(f.icon)}</span><h3 class="focus__title">${esc(f.title)}</h3><p>${esc(f.text)}</p></li>`
          )
          .join('')}
      </ul>
    </div>
  </section>

  ${visionMission({ id: 'vision-mission' })}

  <!-- Language programmes -->
  <section class="section section--tint" id="programmes" aria-labelledby="programmes-title">
    <div class="container">
      <div class="section-head section-head--split" data-reveal>
        <div>
          ${eyebrow('Language programmes')}
          <h2 class="section-title" id="programmes-title">Our Language Programmes</h2>
        </div>
        <p class="section-lead">We offer training in seven language categories. Contact us to enquire about current training opportunities for any language.</p>
      </div>
      <div class="programme-grid">
        ${languages.map(programmeCard).join('')}
        <aside class="programme programme--cta" data-reveal>
          <div class="programme__body">
            <span class="lang-card__cta-icon">${icon('chat')}</span>
            <h3 class="programme__name">Have a question about a programme?</h3>
            <p>Our team will be glad to help you choose a language and learning mode that suits your goals.</p>
            <a class="btn btn--gold btn--sm" href="#contact">Contact us ${icon('arrow')}</a>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- How we deliver training -->
  <section class="section" id="learning-modes" aria-labelledby="delivery-title">
    <div class="container">
      <div class="section-head section-head--center" data-reveal>
        ${eyebrow('How we deliver training')}
        <h2 class="section-title" id="delivery-title">Two Ways to Learn</h2>
        <p class="section-lead">Learners can access LDSTAR Africa language training through physical, classroom-based sessions or through online learning.</p>
      </div>
      <div class="delivery">
        ${learningModes.map(deliveryColumn).join('')}
      </div>
    </div>
  </section>

  ${contactSection({
    title: 'Ready to Start Learning?',
    text: 'Contact LDSTAR Africa Language Centre to find out more about our language training opportunities.',
  })}

</main>
${footer()}`;
};
