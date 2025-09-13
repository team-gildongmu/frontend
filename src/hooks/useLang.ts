import { useEffect, useState } from "react";
import { C } from "@/constant";
import i18n, { LocaleType } from "@/i18n";
import { getCookie, setCookie } from "@/hooks/useCookies";

export interface Language {
  locale: LocaleType;
  label: string;
  selected: boolean;
}

export const useLanguages = () => {
  const [currentLocale, setCurrentLocale] = useState<LocaleType>(
    i18n.language as LocaleType
  );

  useEffect(() => {
    const updateLanguage = () => {
      const newLocale = i18n.language as LocaleType;

      setCurrentLocale(newLocale);
    };

    // i18n 언어 변경 이벤트 리스너
    i18n.on("languageChanged", updateLanguage);

    // 커스텀 이벤트 리스너 (강제 업데이트용)
    window.addEventListener("languageChanged", updateLanguage);

    // 초기 언어 설정
    updateLanguage();

    return () => {
      i18n.off("languageChanged", updateLanguage);
      window.removeEventListener("languageChanged", updateLanguage);
    };
  }, [currentLocale]);

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

export const saveLangCookie = (lang: string): Promise<void> => {
  return new Promise((resolve) => {
    if (!lang) {
      resolve();
      return;
    }

    try {
      setCookie(C.USER_LANG_KEY, lang, 365);

      setTimeout(() => {
        const savedLang = getCookie(C.USER_LANG_KEY);
        if (savedLang === lang) {
          resolve();
        } else {
          setCookie(C.USER_LANG_KEY, lang, 365);
          resolve();
        }
      }, 10);
    } catch {
      resolve();
    }
  });
};

export const setLanguage = async (lang: string): Promise<void> => {
  try {
    await saveLangCookie(lang);

    await i18n.changeLanguage(lang);

    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  } catch (error) {
    console.error("언어 변경 중 오류:", error);
  }
};
