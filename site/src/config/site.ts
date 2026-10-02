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
  url: "https://agrocropfresh.rs",

  /**
   * ⚠️  EDIT ME — e-mail addresses are GENERIC PLACEHOLDERS.
   * Replace with the real inboxes once available. They are used in:
   *   - Contact section (visible + mailto links)
   *   - Footer
   *   - Contact form delivery target
   */
  email: {
    office: "agrocropfresh@gmail.com",
    sales: "prodaja@agrocropfresh.rs",
  },

  company: {
    brand: "Agrocrop Fresh",
    legalName:
      "Agrocrop Fresh d.o.o. za trgovinu i usluge u poljoprivredi Novi Sad",
    founded: 2012,
    farmSince: 1975,
    registrationNumber: "20798645", // Matični broj
    taxId: "107421000", // PIB
  },

  address: {
    headquarters: {
      street: "Bulevar oslobođenja 66b",
      city: "Novi Sad",
      country: "Srbija",
      countryEn: "Serbia",
    },
    production: {
      /** As listed on Google Maps. */
      name: "PG Đurđević",
      city: "Pećinci",
      region: "Srem, Vojvodina",
      /**
       * Google Maps embed for that listing (Maps → Share → Embed a map).
       * {lang} is replaced with the page language.
       */
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2826.702785896419!2d19.9873952!3d44.888697099999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a4fda06296543%3A0xbcfd7fa6933d084d!2zUEcgxJB1csSRZXZpxIc!5e1!3m2!1s{lang}!2srs!4v1790958731517!5m2!1s{lang}!2srs",
    },
  },

  contacts: [
    {
      name: "Sonja Đurđević",
      phone: "+381 64 854 17 82",
      phoneHref: "+381648541782",
    },
    {
      name: "Aleksandar Đurđević",
      phone: "+381 64 882 22 40",
      phoneHref: "+381648822240",
    },
  ],

  stats: {
    hectares: 10,
    annualTonnes: 3000,
    coldStorageTonnes: 400,
    packingCenterM2: 2500,
  },
} as const;

export type SiteConfig = typeof site;
