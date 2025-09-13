import { C } from "@/constant";
import i18n, { LocaleType } from "@/i18n";
import { setCookie } from "@/hooks/useCookies";

export interface Language {
  locale: LocaleType;
  label: string;
  selected: boolean;
}

export const useLanguages = () => {
  const currentLocale = i18n.language as LocaleType;

  const languages: Language[] = [
    { locale: "ko", label: "한국어", selected: currentLocale === "ko" },
    { locale: "en", label: "English", selected: currentLocale === "en" },
    { locale: "ja", label: "日本語", selected: currentLocale === "ja" },
  ];

  const currentLanguage = languages.find((lang) => lang.selected);

  return {
    languages,
    currentLanguage: currentLanguage?.label,
    currentLanguageLocale: currentLanguage?.locale,
    currentLocale,
  };
};

export const saveLangCookie = (lang: string) => {
  if (!lang) {
    return;
  }

  const expires = new Date();
  expires.setDate(expires.getDate() + 365);

  setCookie(C.USER_LANG_KEY, lang, 365);
};

export const setLanguage = async (lang: string) => {
  await i18n.changeLanguage(lang);
  saveLangCookie(lang);
};
