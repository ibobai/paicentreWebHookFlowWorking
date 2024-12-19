import type { Language } from './types';
import { translations } from './translations';

export * from './types';
export * from './translations';

export function getTranslation(language: Language, key: string): string {
  try {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value === undefined || value === null) {
        console.warn(`Translation missing for key: ${key} in language: ${language}`);
        return key;
      }
      value = value[k];
    }

    if (typeof value === 'string') {
      return value;
    }

    console.warn(`Invalid translation value for key: ${key} in language: ${language}`);
    return key;
  } catch (error) {
    console.error(`Error getting translation for key: ${key}`, error);
    return key;
  }
}