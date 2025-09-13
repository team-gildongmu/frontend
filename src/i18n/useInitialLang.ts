// src/i18n/useInitializeLanguage.ts
"use client";

import { useEffect, useRef } from "react";
import i18n, { LocaleType } from "@/i18n";

const toHtmlLang = (l: string) => l;

export const useInitializeLanguage = (initialLang: string) => {
  const initialized = useRef(false);

  useEffect(() => {
    const initLanguage = async () => {
      if (initialized.current) return;
      initialized.current = true;

      try {
        const lang = initialLang as LocaleType;

        await i18n.changeLanguage(lang);

        await new Promise((resolve) => setTimeout(resolve, 100));

        if (typeof document !== "undefined") {
          document.documentElement.lang = toHtmlLang(lang);
        }

        window.dispatchEvent(new Event("languageChanged"));
      } catch (error) {
        console.error("언어 초기화 오류:", error);
      }
    };

    const timer = setTimeout(initLanguage, 50);

    return () => clearTimeout(timer);
  }, [initialLang]);
};
