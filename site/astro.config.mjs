// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// ─────────────────────────────────────────────────────────────
// ⚠️  EDIT ME: replace with the final production domain once
//     it is registered. Used for canonical URLs, sitemap and OG.
// ─────────────────────────────────────────────────────────────
const SITE_URL = 'https://agrocropfresh.rs';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',

  i18n: {
    defaultLocale: 'sr',
    locales: ['sr', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'sr',
        locales: { sr: 'sr', en: 'en' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
