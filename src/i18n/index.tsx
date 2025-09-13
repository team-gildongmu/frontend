import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import ko from "@/i18n/json/ko.json";
import en from "@/i18n/json/en.json";
import ja from "@/i18n/json/ja.json";

export type LocaleType = "ko" | "en" | "ja";

const resources = {
  ko: { translation: ko },
  en: { translation: en },
  ja: { translation: ja },
} as const;

const getInitialLanguage = (): LocaleType => {
  if (typeof window === "undefined") return "ko";

  const browserLang = navigator.language.split("-")[0];
  if (browserLang === "ko" || browserLang === "en" || browserLang === "ja") {
    return browserLang as LocaleType;
  }

  return "ko";
};

if (!i18n.isInitialized) {
  const initialLang = getInitialLanguage();

  i18n.use(initReactI18next).init({
    resources,
    lng: initialLang,
    fallbackLng: "ko",
    interpolation: { escapeValue: false },
    react: {
      useSuspense: false,
    },
  });
}

export default i18n;
