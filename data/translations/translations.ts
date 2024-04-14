import { z } from "zod";

import gr from "./gr.json";
import en from "./en.json";

export const translation = {
  en,
  gr,
};

type AllTranslations = typeof translation;
export type Messages = typeof gr & typeof en;

// Contains the language codes
export type SupportedLangCodes = keyof AllTranslations;

// export type TranslationHome = Messages["home"];

// Custom enum with the supported language codes
export const SupportedLangs = z.custom<SupportedLangCodes>();
