import { sr } from './sr';
import { en } from './en';
import type { Dictionary, Locale } from './types';

export type { Dictionary, Locale };

export const locales: Locale[] = ['sr', 'en'];
export const defaultLocale: Locale = 'sr';

const dictionaries: Record<Locale, Dictionary> = { sr, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Path prefix for a locale ('' for default, '/en' for English). */
export function localePath(locale: Locale, path = '/'): string {
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${prefix}${normalized}` || '/';
}

/** The equivalent URL of the current page in the other locale. */
export function alternatePath(locale: Locale): string {
  return locale === 'sr' ? '/en' : '/';
}

/** BCP 47 language tag for <html lang>. */
export function htmlLang(locale: Locale): string {
  return locale === 'sr' ? 'sr-Latn-RS' : 'en';
}
