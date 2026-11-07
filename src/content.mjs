/**
 * LDSTAR Africa Language Centre — site content.
 *
 * This is the single source of truth for institutional information.
 * Edit text here, then run `npm run build` to regenerate the site in /dist.
 *
 * RULE: only add information that the institution has confirmed.
 */

export const site = {
  name: 'LDSTAR Africa Language Centre',
  shortName: 'LDSTAR Africa',
  url: 'https://ldsafrica.org',
  locale: 'en_KE',
  tagline: 'Connecting Africa to the World Through Language.',
  description:
    'LDSTAR Africa Language Centre offers training in English, Kiswahili, African languages, German, Spanish, French and Chinese for professionals, academics and individuals, through physical and online learning.',
  vision: 'To be a premier language institution in Africa offering training and skills in global languages.',
  mission: 'To disseminate language knowledge and skills to professionals and members of academia.',
};

export const contact = {
  phoneDisplay: '+254 107 105 407',
  phoneE164: '+254107105407',
  whatsappNumber: '254107105407',
  email: {
    address: 'admin@ldsafrica.org',
    confirmed: true,
  },
  defaultEnquiry: 'Hello LDSTAR Africa Language Centre, I would like to enquire about your language training.',
};

/** Builds a WhatsApp link with an optional pre-filled message. */
export const whatsappLink = (message = contact.defaultEnquiry) =>
  `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const telLink = () => `tel:${contact.phoneE164}`;

export const mailLink = (subject = 'Language training enquiry') =>
  `mailto:${contact.email.address}?subject=${encodeURIComponent(subject)}`;

/**
 * Primary navigation. `href` values are root-relative so they work from every page.
 * Add, remove or reorder items here.
 */
export const navigation = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'About Us', href: '/about/', page: 'about' },
  { label: 'Languages', href: '/#languages' },
  { label: 'Learning Modes', href: '/#learning-modes' },
  { label: 'Contact', href: '#contact' },
];

/**
 * Language programmes. Each entry drives the homepage card and the programme
 * card on the About page. To add details later (levels, durations, fees),
 * add fields here and render them in src/pages/*.mjs.
 */
export const languages = [
  {
    slug: 'english',
    name: 'English',
    greeting: { text: 'Hello', lang: 'en' },
    summary: 'Build the confidence to communicate clearly in a language of international business, diplomacy and scholarship.',
    detail:
      'English is used widely in international business, diplomacy, science and higher education. Strong English communication supports professional writing, presentations, research and collaboration with colleagues around the world.',
    image: { file: 'lang-english', width: 900, height: 600, alt: 'Big Ben and the Palace of Westminster in London under a bright sky' },
  },
  {
    slug: 'kiswahili',
    name: 'Kiswahili',
    greeting: { text: 'Habari', lang: 'sw' },
    summary: 'Communicate in one of Africa’s most widely spoken languages, at the heart of East African life and work.',
    detail:
      'Kiswahili is spoken by millions of people across East and Central Africa and is a working language of the African Union. Learning Kiswahili supports regional engagement, community work, cultural understanding and professional life across the region.',
    image: { file: 'lang-kiswahili', width: 900, height: 600, alt: 'Mount Kilimanjaro rising above the East African landscape' },
  },
  {
    slug: 'african-languages',
    name: 'African Languages',
    greeting: null, // rendered with a woven pattern instead of a single greeting
    summary: 'Engage with the continent’s rich linguistic heritage. Contact us to enquire about the African languages available.',
    detail:
      'Africa is home to a remarkable diversity of languages that carry history, identity and culture. Learning an African language deepens understanding of communities and opens new possibilities for research, development work and cultural exchange. Please contact us to enquire about the African languages currently available.',
    image: { file: 'lang-african', width: 900, height: 600, alt: 'Close-up of hands weaving brightly coloured African textile on a loom' },
  },
  {
    slug: 'german',
    name: 'German',
    greeting: { text: 'Guten Tag', lang: 'de' },
    summary: 'Open pathways to study, research and professional opportunities in German-speaking countries.',
    detail:
      'German is one of the most widely spoken languages in Europe and is closely associated with engineering, research, higher education and international trade. German language skills can support academic exchange, professional mobility and collaboration with German-speaking institutions.',
    image: { file: 'lang-german', width: 900, height: 747, alt: 'The Brandenburg Gate in Berlin at dusk' },
  },
  {
    slug: 'spanish',
    name: 'Spanish',
    greeting: { text: 'Hola', lang: 'es' },
    summary: 'Connect with a global community of speakers across Europe, the Americas and Equatorial Guinea in Africa.',
    detail:
      'Spanish is spoken across Spain, Latin America and Equatorial Guinea, and is one of the most widely spoken languages in the world. It is valuable for international relations, tourism, trade and cultural exchange.',
    image: { file: 'lang-spanish', width: 900, height: 600, alt: 'The Metropolis building on Gran Vía in Madrid under a clear blue sky', position: '28% center' },
  },
  {
    slug: 'french',
    name: 'French',
    greeting: { text: 'Bonjour', lang: 'fr' },
    summary: 'Communicate across the many African countries where French is widely spoken, and beyond.',
    detail:
      'French is widely spoken across West, Central and North Africa and is a working language of many international organisations. French language skills support regional collaboration, diplomacy, international development and academic exchange.',
    image: { file: 'lang-french', width: 900, height: 675, alt: 'A Paris street lined with trees, with the Eiffel Tower in the distance' },
  },
  {
    slug: 'chinese',
    name: 'Chinese',
    greeting: { text: '你好', lang: 'zh' },
    summary: 'Gain language skills that support trade, investment and cultural exchange between Africa and China.',
    detail:
      'Chinese is one of the world’s most widely spoken languages. With growing trade, investment and educational links between Africa and China, Chinese language skills are increasingly relevant for professionals, students and businesses.',
    image: { file: 'lang-chinese', width: 900, height: 567, alt: 'The Great Wall of China winding across mountain ridges' },
  },
];

/** The two learning modes. */
export const learningModes = [
  {
    slug: 'physical',
    icon: 'users',
    title: 'Physical Learning',
    label: 'In-person training',
    description: 'Experience interactive, instructor-led language training in a collaborative learning environment.',
    points: [
      'Face-to-face, instructor-led sessions',
      'Interactive speaking and listening practice with fellow learners',
      'A focused, collaborative classroom environment',
    ],
    image: { file: 'physical-classroom', width: 1200, height: 901, alt: 'An instructor leading an interactive training session with a room of adult learners' },
    aboutImage: { file: 'physical-classroom', width: 1200, height: 901, alt: 'An instructor leading an interactive training session with a room of adult learners' },
  },
  {
    slug: 'online',
    icon: 'monitor',
    title: 'Online Learning',
    label: 'Remote training',
    description: 'Access language learning remotely through flexible online training and digital learning experiences.',
    points: [
      'Learn remotely, wherever you are',
      'Flexible online training that fits around work and study',
      'Digital learning experiences guided by instructors',
    ],
    image: { file: 'online-learning', width: 1200, height: 800, alt: 'A learner taking part in a live online lesson with an instructor on a laptop' },
    aboutImage: { file: 'online-instructor', width: 1200, height: 800, alt: 'An instructor delivering an online lesson from a laptop surrounded by books' },
  },
];

/** Focus areas on the About page. */
export const focusAreas = [
  { icon: 'book', title: 'Language knowledge', text: 'A solid understanding of how a language works — its vocabulary, structure and use.' },
  { icon: 'briefcase', title: 'Professional development', text: 'Language skills that strengthen communication in the workplace and support career growth.' },
  { icon: 'cap', title: 'Academic communication', text: 'Confident language use for study, research, writing and scholarly collaboration.' },
  { icon: 'languages', title: 'African and global languages', text: 'Training that brings together local, African and international languages.' },
  { icon: 'globe', title: 'Cultural and international engagement', text: 'Greater understanding across cultures and stronger participation in a global society.' },
];
