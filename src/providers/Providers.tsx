"use client";

import QueryProvider from "@/providers/QueryProvider";
import colors from "@/styles/Colors";
import { ThemeProvider } from "styled-components";
import { CookiesProvider } from "react-cookie";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookiesProvider>
      <ThemeProvider theme={{ colors }}>
        <QueryProvider>{children}</QueryProvider>
      </ThemeProvider>
    </CookiesProvider>
  );
}
