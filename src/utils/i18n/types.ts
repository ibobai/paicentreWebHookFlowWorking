import type { TranslationSchema } from './translations';

export type Language = 'en' | 'fr';

type PathImpl<T, Key extends keyof T> =
  Key extends string
  ? T[Key] extends Record<string, any>
    ? `${Key}.${PathImpl<T[Key], Exclude<keyof T[Key], keyof any[]>> & string}`
    : Key
  : never;

export type TranslationPath = PathImpl<TranslationSchema, keyof TranslationSchema>;

export type TranslationKey = keyof TranslationSchema;