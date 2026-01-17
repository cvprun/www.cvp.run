export const languages = ['ko', 'en'] as const;
export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'ko';

export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language);
}
