import type { Dictionary } from './types';

export const en: Dictionary = {
  meta: {
    title: 'Agrocrop Fresh — Fresh Peppers from Serbia | White Bell & Sweet Pointed',
    description:
      'Family-run pepper production since 1975. Fifteen hectares of modern greenhouses, 2,500 tonnes per year, GLOBALG.A.P. certified, exporting across the European market.',
    ogLocale: 'en_US',
  },

  nav: {
    story: 'Our story',
    production: 'Production',
    products: 'Products',
    quality: 'Quality',
    gallery: 'Gallery',
    contact: 'Contact',
    cta: 'Request a quote',
  },

  hero: {
    kicker: 'Hydroponic production · Vojvodina, Serbia',
    titleLine1: 'Fresh peppers,',
    titleLine2: 'all year round.',
    lede: 'White bell (babura) and sweet pointed (šilja) peppers from 15 hectares of controlled greenhouse production — consistent quality for wholesalers, retail chains, processors and exporters.',
    ctaPrimary: 'Request a quote',
    ctaSecondary: 'Our products',
    scroll: 'Scroll',
  },

  story: {
    kicker: 'Our story',
    title:
      'History and development: from a family tradition to a leader in hydroponic production',
    chapters: [
      {
        era: '1975 — 2012',
        title: 'From a spoon to hydroponics',
        paragraphs: [
          'Our story began in 1975, on a single jutro of land — a little over half a hectare.',
          'That year Dobrivoj and Tomislav Đurđević planted their first peppers in the open field, using a spoon. It is a detail the family still retells today, and nothing says more about where we started and how far we have come since.',
          'We built our first greenhouses in 1997, also on a single jutro. By then Tomislav was working alongside his son Branislav, who over the following years took on more and more responsibility for the business. Peppers remained our main crop, and year after year there were more greenhouses.',
          'As production grew, sales needed better organisation too. So in 2012 Sonja Đurđević founded Agrocrop Fresh. While Branislav developed production, Sonja built the support for bringing it to market and for working with customers. That is how Agrocrop Fresh became part of the same family business.',
        ],
      },
      {
        era: '2019 — 2025',
        title: 'A turning point in our work',
        paragraphs: [
          'By 2019 we had reached 14.12 hectares of soil-based greenhouses. Behind that area lay a great deal of work — and experience that taught us expansion alone is not enough. Branislav then made the decision that set our course: building modern facilities at a new location, with greater control over the conditions in which our peppers grow.',
          'We began building the first five hectares of new greenhouses in 2019 and added another 3.8 hectares in 2022. Then in 2025 — exactly fifty years after the first planting — we started hydroponic production on 2.5 hectares.',
          'From the spoon that planted the first pepper to hydroponics, almost everything about the way we work has changed. What brought us here were the people of our family, each with their own knowledge, decisions and years spent in production.',
        ],
      },
      {
        era: '2026 — 2027',
        title: 'A story we carry on',
        paragraphs: [
          'In the 2026 season we grew on 8.8 hectares, 6.5 of them hydroponic. For 2027 we are planning a total of 10 hectares of fully hydroponic production, with a planned annual volume of around 3,000 tonnes of peppers. An additional 2.5-hectare facility is also planned.',
          'Today Aleksandar is part of the daily work too — together with his brothers Dušan and Andrej, he represents the fourth generation of the Đurđević family. He steps in wherever he is needed: in production and in every other task the day brings. Working alongside his father and mother, he is learning the business from the inside, just as they learned it with their own family.',
          'Agrocrop Fresh is part of that story. Behind its name stand the Đurđević family, our peppers, and the business we have been building since 1975.',
        ],
      },
    ],
  },

  production: {
    kicker: 'Production',
    title: 'Controlled conditions. Consistent results.',
    lede: 'Every stage — from seedling to harvest — takes place under cover and constant supervision. That is why our peppers look the same in March and in November.',
    stats: [
      { value: '15', suffix: 'ha', label: 'of modern greenhouses' },
      { value: '2,500', suffix: 't', label: 'of peppers produced annually' },
      { value: '400', suffix: 't', label: 'of cold storage capacity' },
      { value: '2,500', suffix: 'm²', label: 'packing centre' },
    ],
    bioTitle: 'Biological crop protection',
    bioText:
      'We favour natural protection mechanisms — beneficial organisms keep the crops healthy, so the fruit stays clean, safe and ready for the most demanding markets.',
  },

  products: {
    kicker: 'Products',
    title: 'Two varieties. One standard.',
    lede: 'We specialise in white peppers — babura and šilja. Focusing on two varieties means full control over sizing, packing and quality in every single delivery.',
    items: [
      {
        id: 'babura',
        name: 'Babura',
        tagline: 'Large, fleshy, glossy.',
        description:
          'White bell pepper with uniform sizing and firm, juicy flesh. Ideal for fresh consumption, stuffing and processing — a staple of Serbian and European tables.',
        traits: ['Uniform sizing', 'Firm, fleshy fruit', 'Long shelf life in the cold chain'],
      },
      {
        id: 'silja',
        name: 'Šilja',
        tagline: 'Elongated, sweet, crisp.',
        description:
          'White pointed pepper with a distinctive elongated shape and mildly sweet taste. In demand across retail and processing — from fresh salads to traditional preserves.',
        traits: ['Distinctive shape', 'Mildly sweet taste', 'Excellent fresh or processed'],
      },
    ],
  },

  quality: {
    kicker: 'Quality',
    title: 'A standard that is verified, not promised.',
    lede: 'For us, quality is not a marketing word but a procedure — certified, documented and visible in every crate that leaves the packing centre.',
    pillars: [
      {
        title: 'GLOBALG.A.P. certificate',
        text: 'Production aligned with the strictest international standard of good agricultural practice — the entry ticket to leading European retail shelves.',
      },
      {
        title: 'Biological protection',
        text: 'Plant health is maintained through natural mechanisms, with minimal use of chemical agents and full fruit safety.',
      },
      {
        title: 'Cold chain',
        text: '400 tonnes of cold storage ensure the peppers keep their full freshness, firmness and taste from harvest to delivery.',
      },
      {
        title: 'Traceability',
        text: 'Every delivery carries complete documentation — from plot and harvest date to buyer. Trust is built on data.',
      },
    ],
  },

  logistics: {
    kicker: 'Logistics & export',
    title: 'From harvest to your dock — without delay.',
    lede: 'A 2,500 m² packing centre and our own cold storage enable fast preparation to customer specification and reliable deliveries across the European market.',
    points: [
      {
        title: 'Packing to specification',
        text: 'Cardboard and plastic packaging, sizing and labelling adapted to each buyer and market.',
      },
      {
        title: 'Unbroken cold chain',
        text: 'Immediately after harvest, produce is cooled and kept at optimal temperature until loading.',
      },
      {
        title: 'Export to European markets',
        text: 'Regular deliveries to major retail chains and distributors in the region and the European Union.',
      },
    ],
  },

  gallery: {
    kicker: 'Gallery',
    title: 'Production worth seeing.',
  },

  contact: {
    kicker: 'Contact',
    title: "Let's talk about your next delivery.",
    lede: 'Send an inquiry with approximate volumes and timelines — we respond within one business day.',
    form: {
      name: 'Full name',
      company: 'Company',
      email: 'E-mail',
      phone: 'Phone',
      message: 'Message',
      messagePlaceholder: 'Variety, volume, delivery schedule…',
      submit: 'Send inquiry',
      note: 'Submitting opens a pre-filled message in your e-mail client.',
    },
    salesHeading: 'Sales & inquiries',
    hqHeading: 'Headquarters',
    productionHeading: 'Production & distribution centre',
    productionValue: 'Pećinci, Srem region',
  },

  footer: {
    tagline: 'Family-run pepper production since 1975. From Srem, to European tables.',
    navHeading: 'Navigation',
    contactHeading: 'Contact',
    rights: 'All rights reserved.',
  },

  a11y: {
    skipToContent: 'Skip to content',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    langSwitch: 'Prebacite na srpski',
    langSwitchShort: 'SR',
    heroVideoLabel: 'Aerial footage of the greenhouses',
    lightboxClose: 'Close viewer',
    lightboxPrev: 'Previous photo',
    lightboxNext: 'Next photo',
    galleryOpen: 'Enlarge photo',
  },
};
