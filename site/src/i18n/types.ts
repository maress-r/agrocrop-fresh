export type Locale = 'sr' | 'en';

export interface TimelineEntry {
  year: string;
  title: string;
  text: string;
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
    lede: string;
    timeline: TimelineEntry[];
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
  quality: {
    kicker: string;
    title: string;
    lede: string;
    pillars: Pillar[];
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
  };
}
