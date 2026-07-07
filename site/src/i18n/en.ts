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
    title: 'Half a century devoted to a single crop.',
    lede: 'From a family farm to one of the most modern pepper producers in the region — a story of three generations, one plant, and a standard that accepts no compromise.',
    timeline: [
      {
        year: '1975',
        title: 'The family farm',
        text: 'In the heart of Srem, the Đurđević family begins working the land. Peppers quickly become the crop that receives special attention — and it has stayed that way ever since.',
      },
      {
        year: '1997',
        title: 'Moving under cover',
        text: 'Production moves from open fields into the first greenhouses. Controlled conditions deliver what the market demands: uniform quality and reliable supply.',
      },
      {
        year: '2012',
        title: 'Agrocrop Fresh is founded',
        text: 'The family operation becomes Agrocrop Fresh LLC, headquartered in Novi Sad. Tradition gains a professional structure.',
      },
      {
        year: 'Today',
        title: '15 hectares of modern production',
        text: 'Modern greenhouses, biological crop protection and GLOBALG.A.P. certification. Peppers from Pećinci reach buyers across the European market.',
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
