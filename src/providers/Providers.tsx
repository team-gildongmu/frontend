"use client";

import QueryProvider from "@/providers/QueryProvider";
import colors from "@/styles/Colors";
import { ThemeProvider } from "styled-components";
import { CookiesProvider } from "react-cookie";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <CookiesProvider>
        <ThemeProvider theme={{ colors }}>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </CookiesProvider>
    </I18nextProvider>
  );
}
