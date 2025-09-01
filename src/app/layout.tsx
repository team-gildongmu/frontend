import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/providers/Providers";
import ClientLayout from "@/styles/ClientLayout";
import { Layout } from "@/component/common/Layout";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "길동무",
  description: "길동무 프론트엔드 페이지입니다",
  icons: {
    icon: "/seoImage.png",
  },
  openGraph: {
    title: "길동무",
    description: "길동무 프론트엔드 페이지입니다",
    images: ["/seoImage.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "길동무",
    description: "길동무 프론트엔드 페이지입니다",
    images: ["/seoImage.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
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
