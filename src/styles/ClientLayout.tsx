"use client";

import { useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { noto_kr } from "./Typography";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined") {
    return <div className={noto_kr.className}>{children}</div>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <div className={noto_kr.className}>{children}</div>
    </StyleSheetManager>
  );
}
