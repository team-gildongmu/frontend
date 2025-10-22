// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";

import { C } from "@/constant";
import { Providers } from "@/providers/Providers";
import ClientLayout from "@/styles/ClientLayout";
import { Layout } from "@/component/common/Layout";

// ✅ 클라이언트 훅을 쓰는 컴포넌트를 별도 파일로 분리
import LanguageInitializer from "@/app/language-initializer";

export const metadata: Metadata = {
  title: "길동무 - 여행의 모든 순간을 기록하세요",
  description:
    "여행 스탬프 수집, 여행 로그 작성, 리뷰 공유까지. 당신의 특별한 여행 이야기를 길동무와 함께 만들어보세요.",
  icons: {
    icon: "/seoImage.png",
  },
  openGraph: {
    title: "길동무 - 여행의 모든 순간을 기록하세요",
    description:
      "여행 스탬프 수집, 여행 로그 작성, 리뷰 공유까지. 당신의 특별한 여행 이야기를 길동무와 함께 만들어보세요.",
    images: ["/seoImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "길동무 - 여행의 모든 순간을 기록하세요",
    description:
      "여행 스탬프 수집, 여행 로그 작성, 리뷰 공유까지. 당신의 특별한 여행 이야기를 길동무와 함께 만들어보세요.",
    images: ["/seoImage.png"],
  },
};

const toHtmlLang = (l: string) => l;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Next 14+ 에서는 await 필요
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(C.USER_LANG_KEY)?.value ?? "ko";
  const htmlLang = toHtmlLang(cookieLang);

  return (
    <html lang={htmlLang}>
      <body>
        {/* 클라이언트 진입 시 i18n 언어 동기화 */}
        <LanguageInitializer initialLang={cookieLang} />

        {/* Kakao SDK */}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&autoload=false`}
          strategy="afterInteractive"
        />

        <ClientLayout>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </ClientLayout>
      </body>
    </html>
  );
}
