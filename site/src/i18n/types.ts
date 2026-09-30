export type Locale = 'sr' | 'en';

export interface StoryChapter {
  /** Period the chapter covers, shown as its eyebrow (e.g. "1975 — 2012"). */
  era: string;
  title: string;
  paragraphs: string[];
}

export interface Stat {
  value: string;
  suffix: string;
  label: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  traits: string[];
}

export interface Pillar {
  title: string;
  text: string;
}

/** A beneficial-organism system from Biobest (facts from the product pages). */
export interface BeneficialItem {
  id: 'propylea' | 'orius' | 'swirskii' | 'micromus';
  name: string;
  /** What the organism is, e.g. "Predatory mite". */
  organism: string;
  /** The pests it controls. */
  target: string;
  fact: string;
}

export interface StandardItem {
  id: 'globalgap' | 'grasp';
  name: string;
  subtitle: string;
  text: string;
  /** How compliance is confirmed. */
  note: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
    ogLocale: string;
  };
  nav: {
    story: string;
    production: string;
    products: string;
    quality: string;
    gallery: string;
    contact: string;
    cta: string;
  };
  hero: {
    kicker: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    scroll: string;
  };
  story: {
    kicker: string;
    title: string;
    chapters: StoryChapter[];
  };
  production: {
    kicker: string;
    title: string;
    lede: string;
    stats: Stat[];
    bioTitle: string;
    bioText: string;
  };
  products: {
    kicker: string;
    title: string;
    lede: string;
    items: ProductItem[];
  };
  /** Section 04, told as one path: balance → beneficials → treatments → standards. */
  quality: {
    kicker: string;
    title: string;
    lede: string;
    /** Accessible name of the chapter navigation. */
    pathLabel: string;
    balance: {
      label: string;
      title: string;
      lead: string;
      /** Revealed on demand. */
      more: string;
      statement: string;
      readMore: string;
      readLess: string;
    };
    beneficials: {
      label: string;
      title: string;
      intro: string;
      targetLabel: string;
      source: string;
      items: BeneficialItem[];
    };
    treatments: {
      label: string;
      title: string;
      text: string;
      steps: Pillar[];
    };
    standards: {
      label: string;
      title: string;
      items: StandardItem[];
    };
  };
  logistics: {
    kicker: string;
    title: string;
    lede: string;
    points: Pillar[];
  };
  gallery: {
    kicker: string;
    title: string;
    /** "+" tile caption. */
    more: string;
    /** Photo count per plural category (Intl.PluralRules); {count} is replaced. */
    moreCount: Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };
    moreTitle: string;
  };
  contact: {
    kicker: string;
    title: string;
    lede: string;
    form: {
      name: string;
      company: string;
      email: string;
      phone: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      note: string;
    };
    salesHeading: string;
    hqHeading: string;
    productionHeading: string;
    productionValue: string;
  };
  footer: {
    tagline: string;
    navHeading: string;
    contactHeading: string;
    rights: string;
  };
  a11y: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    langSwitch: string;
    langSwitchShort: string;
    heroVideoLabel: string;
    lightboxClose: string;
    lightboxPrev: string;
    lightboxNext: string;
    galleryOpen: string;
    /** Appended to links that open in a new tab. */
    newTab: string;
  };
}
