import { NextRequest, NextResponse } from 'next/server';

import { C } from '@/constants/storage';
import { routes } from '@/utils/routes';

export async function middleware(req: NextRequest) {
  const userAuthToken = req.cookies.get(C.AUTH_TOKEN_KEY)?.value;
  const currentPath = req.nextUrl.pathname;

  const authGuardedRoutes = [routes.myroad, routes.location];
  const guestOnlyRoutes = [routes.login, routes.oauth];

  try {
    // 1. 로그인하지 않은 유저가 보호된 라우트 접근 시 → 로그인 페이지로
    if (!userAuthToken && authGuardedRoutes.some((path) => currentPath.startsWith(path))) {
      const loginUrl = new URL(routes.login, req.nextUrl.origin);
      loginUrl.searchParams.set('redirect', currentPath);
      return NextResponse.redirect(loginUrl);
    }

    // 2. 로그인한 유저가 로그인/OAuth 페이지 접근 시 → 홈으로
    if (userAuthToken && guestOnlyRoutes.some((path) => currentPath.startsWith(path))) {
      const homeUrl = new URL(routes.home, req.nextUrl.origin);
      return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
  } catch (error) {
    console.error('❗ Middleware Error:', error);
    return new NextResponse('Internal Server Error (Middleware)', { status: 500 });
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|api).*)',
};
