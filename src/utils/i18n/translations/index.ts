import { en } from './en';
import { fr } from './fr';

export type TranslationSchema = typeof en;

export const translations = {
  en,
  fr
} as const;

export * from './en';
export * from './fr';