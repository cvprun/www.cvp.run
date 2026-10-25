import {changelog} from './changelog';
import {common} from './common';
import {features} from './features';
import {landing} from './landing';
import {mocks} from './mocks';
import {pricing} from './pricing';
import {security} from './security';

export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    ...common.ko,
    ...landing.ko,
    ...features.ko,
    ...pricing.ko,
    ...security.ko,
    ...changelog.ko,
    ...mocks.ko,
  },
  en: {
    ...common.en,
    ...landing.en,
    ...features.en,
    ...pricing.en,
    ...security.en,
    ...changelog.en,
    ...mocks.en,
  },
} as const;

export type Translations = (typeof translations)['ko' | 'en'];

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
