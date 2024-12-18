import general from "data/configs/general";
import { SupportedLangCodes } from "data/translations/translations";

export const generateLanguageSlugs = () => {
  return general.languages.map((loc: string) => ({
    locale: loc as SupportedLangCodes,
  }));
};
