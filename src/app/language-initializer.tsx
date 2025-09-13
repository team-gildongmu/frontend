"use client";

import { useInitializeLanguage } from "@/i18n/useInitialLang";

export default function LanguageInitializer({
  initialLang,
}: {
  initialLang: string;
}) {
  useInitializeLanguage(initialLang);
  return null;
}
