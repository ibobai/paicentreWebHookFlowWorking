import { translations } from './translations';

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

type TranslationPath = NestedKeyOf<typeof translations.en>;

export function useTranslation(language: Language = 'en') {
  const t = (key: TranslationPath, params?: Record<string, string | number>): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language];

      for (const k of keys) {
        if (!value || typeof value !== 'object') {
          return translations.en[keys[0]][keys[1]] || key;
        }
        value = value[k];
      }

      if (typeof value !== 'string') {
        return translations.en[keys[0]][keys[1]] || key;
      }

      if (params) {
        return Object.entries(params).reduce((acc, [key, val]) => {
          return acc.replace(`{${key}}`, String(val));
        }, value);
      }

      return value;
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error);
      return key;
    }
  };

  return { t };
}

export { translations };