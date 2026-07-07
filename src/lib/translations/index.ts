import {common} from './common';
import {features} from './features';
import {landing} from './landing';
import {mocks} from './mocks';
import {pricing} from './pricing';

export type Language = 'ko' | 'en';

export const translations = {
  ko: {
    ...common.ko,
    ...landing.ko,
    ...features.ko,
    ...pricing.ko,
    ...mocks.ko,
  },
  en: {
    ...common.en,
    ...landing.en,
    ...features.en,
    ...pricing.en,
    ...mocks.en,
  },
} as const;

export type Translations = (typeof translations)['ko' | 'en'];

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}
