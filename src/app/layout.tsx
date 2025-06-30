import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/providers/Providers";
import ClientLayout from "@/styles/ClientLayout";

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
        <ClientLayout>
          <Providers>
            <main
              style={{
                maxWidth: "780px",
                width: "100%",
                margin: "0 auto",
                padding: "20px",
                minHeight: "100vh",
              }}
            >
              {children}
            </main>
          </Providers>
        </ClientLayout>
      </body>
    </html>
  );
}
