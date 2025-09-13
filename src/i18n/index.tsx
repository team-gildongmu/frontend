// src/i18n/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// 실제 번역 리소스 import
import ko from "./json/ko.json";
import en from "./json/en.json";
import ja from "./json/ja.json";

export type LocaleType = "ko" | "en" | "ja";

const resources = {
  ko: { translation: ko },
  en: { translation: en },
  ja: { translation: ja },
} as const;

// 중복 init 방지
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "ko", // 초기값(서버에서 <html lang>으로 잡고, 클라에서 동기화)
    fallbackLng: "ko",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
