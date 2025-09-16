import { NextRequest, NextResponse } from "next/server";

import { C } from "@/constant";

export async function middleware(req: NextRequest) {
  const userAuthToken = req.cookies.get(C.AUTH_TOKEN_KEY)?.value;
  const currentPath = req.nextUrl.pathname;

  // OAuth 콜백 경로는 제외 (로그인 처리 중)
  const oauthCallbackRoutes = ["/oauth/kakao"];

  try {
    // OAuth 콜백이 아닌 모든 페이지에서 로그인 체크
    const isOAuthCallback = oauthCallbackRoutes.some((path) =>
      currentPath.startsWith(path)
    );

    if (!isOAuthCallback && !userAuthToken) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.next();
    return response;
  } catch (error) {
    console.error("❗ Middleware Error:", error);
    return new NextResponse("Internal Server Error (Middleware)", {
      status: 500,
    });
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$).*)",
  ],
};
