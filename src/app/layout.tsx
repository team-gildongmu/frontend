import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/providers/Providers";
import ClientLayout from "@/styles/ClientLayout";
import { Layout } from "@/component/common/Layout";
import { Suspense } from "react";
import Script from "next/script"; // ✅ 추가

export const metadata: Metadata = {
  title: "길동무",
  description: "길동무 프론트엔드 페이지입니다",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer`}
        />
        <ClientLayout>
          <Providers>
            <Suspense>
              <Layout>{children}</Layout>
            </Suspense>
          </Providers>
        </ClientLayout>
      </body>
    </html>
  );
}
