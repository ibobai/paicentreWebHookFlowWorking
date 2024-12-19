import type { translations } from './translations';

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

type PathImpl<T, Key extends keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
    ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
    : Key
  : never;

export type TranslationPath = PathImpl<typeof translations.en, keyof typeof translations.en>;

export interface TranslationParams {
  [key: string]: string | number;
}

export interface TranslationHook {
  t: (key: TranslationPath, params?: TranslationParams) => string;
}