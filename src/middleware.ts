import { NextRequest, NextResponse } from "next/server";

import { C } from "@/constant";

export async function middleware(req: NextRequest) {
  const userAuthToken = req.cookies.get(C.AUTH_TOKEN_KEY)?.value;
  const currentPath = req.nextUrl.pathname;

  const notAuthGuardedRoutes = ["/oauth/kakao", "/login"];
  const isHomePage = currentPath === "/";

  // 보호된 라우트 체크 (notAuthGuardedRoutes에 해당하지 않는 라우트)
  const isProtectedRoute =
    !isHomePage &&
    !notAuthGuardedRoutes.some((path) => currentPath.startsWith(path));

  try {
    // 1. 로그인하지 않은 유저가 보호된 라우트 접근 시 → 로그인 페이지로
    if (!userAuthToken && isProtectedRoute) {
      const loginUrl = new URL("/login", req.nextUrl.origin);
      loginUrl.searchParams.set("redirect", currentPath);
      return NextResponse.redirect(loginUrl);
    }

    // 2. 로그인한 유저가 로그인/회원가입 페이지 접근 시 → 홈으로
    if (
      userAuthToken &&
      notAuthGuardedRoutes.some((path) => currentPath.startsWith(path))
    ) {
      const homeUrl = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(homeUrl);
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
