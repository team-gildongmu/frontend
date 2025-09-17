import { NextRequest, NextResponse } from "next/server";

import { C } from "@/constant";

export async function middleware(req: NextRequest) {
  const userAuthToken = req.cookies.get(C.AUTH_TOKEN_KEY)?.value;
  const currentPath = req.nextUrl.pathname;

  const excludedRoutes = ["/oauth/kakao", "/oauth", "/login"];

  try {
    // 제외된 경로가 아닌 모든 페이지에서 로그인 체크
    const isExcludedRoute = excludedRoutes.some((path) =>
      currentPath.startsWith(path)
    );

    if (!isExcludedRoute && !userAuthToken) {
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
