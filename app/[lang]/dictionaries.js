import 'server-only';

const dictionaries = {
  en: () => import('../../dictionaries/en.json').then((module) => module.default),
  ar: () => import('../../dictionaries/ar.json').then((module) => module.default),
};

export const locales = ['en', 'ar'];
export const defaultLocale = 'en';

export const hasLocale = (locale) => locale in dictionaries;

export const getDictionary = async (locale) => dictionaries[locale]();
