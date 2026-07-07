/**
 * ═══════════════════════════════════════════════════════════════════
 *  AGROCROP FRESH — SITE CONFIGURATION
 *  Central place for every value that may need editing by hand.
 * ═══════════════════════════════════════════════════════════════════
 */

export const site = {
  /**
   * ⚠️  EDIT ME — production domain (also update astro.config.mjs).
   */
  url: 'https://agrocropfresh.rs',

  /**
   * ⚠️  EDIT ME — e-mail addresses are GENERIC PLACEHOLDERS.
   * Replace with the real inboxes once available. They are used in:
   *   - Contact section (visible + mailto links)
   *   - Footer
   *   - Contact form delivery target
   */
  email: {
    office: 'office@agrocropfresh.rs',
    sales: 'prodaja@agrocropfresh.rs',
  },

  company: {
    brand: 'Agrocrop Fresh',
    legalName: 'Agrocrop Fresh d.o.o. za trgovinu i usluge u poljoprivredi Novi Sad',
    founded: 2012,
    farmSince: 1975,
    registrationNumber: '20798645', // Matični broj
    taxId: '107421000', // PIB
  },

  address: {
    headquarters: {
      street: 'Bulevar oslobođenja 66b',
      city: 'Novi Sad',
      country: 'Srbija',
      countryEn: 'Serbia',
    },
    production: {
      city: 'Pećinci',
      region: 'Srem, Vojvodina',
    },
  },

  contacts: [
    { name: 'Sonja Đurđević', phone: '+381 64 854 17 82', phoneHref: '+381648541782' },
    { name: 'Aleksandar Đurđević', phone: '+381 64 882 22 40', phoneHref: '+381648822240' },
  ],

  stats: {
    hectares: 15,
    annualTonnes: 2500,
    coldStorageTonnes: 400,
    packingCenterM2: 2500,
  },
} as const;

export type SiteConfig = typeof site;
