import "@/styles/globals.css";
import type { Metadata } from "next";
import QueryProvider from "@/providers/QueryProvider";

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
        <QueryProvider>
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
        </QueryProvider>
      </body>
    </html>
  );
}
