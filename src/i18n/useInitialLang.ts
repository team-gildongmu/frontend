// src/i18n/useInitializeLanguage.ts
"use client";

import { useEffect } from "react";
import i18n, { LocaleType } from "@/i18n";
import { C } from "@/constant";
import { getCookie } from "@/hooks/useCookies";

const toHtmlLang = (l: string) => l;

export const useInitializeLanguage = () => {
  useEffect(() => {
    const cookieLang = (getCookie(C.USER_LANG_KEY) ?? "ko") as LocaleType;

    if (i18n.language !== cookieLang) {
      i18n.changeLanguage(cookieLang).catch(() => {});
    }
    document.documentElement.lang = toHtmlLang(cookieLang);
  }, []);
};
