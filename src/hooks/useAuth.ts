import { C } from "@/constant";
import * as CookieUtils from "@/utils/storage";

import { User } from "@/types";

export default function useAuth() {
  const checkUserToken = (): boolean => {
    const userToken = CookieUtils.getCookie(C.AUTH_TOKEN_KEY);
    return !!userToken;
  };

  const getUserToken = () => {
    return CookieUtils.getCookie(C.AUTH_TOKEN_KEY);
  };

  const authorize = (user: User, token: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);
    // 로컬 환경 (개발환경용)
    const isLocalhost = window.location.hostname === "localhost";
    const domain = isLocalhost
      ? "localhost"
      : CookieUtils.getCookie(C.CREATOR_CODE_KEY);

    CookieUtils.setCookie(C.AUTH_TOKEN_KEY, token, {
      path: "/",
      domain,
      expires: expirationDate,
    });
  };

  const logout = async (redirect = "/") => {
    // 로컬 환경 (개발환경용)
    const isLocalhost = window.location.hostname === "localhost";
    const domain = isLocalhost
      ? "localhost"
      : CookieUtils.getCookie(C.CREATOR_CODE_KEY);
    CookieUtils.removeCookie(C.AUTH_TOKEN_KEY, domain, "/");

    localStorage.removeItem(C.COMMUNITY_VIEW_MODE_KEY);

    window.location.replace(redirect);
  };

  return { getUserToken, checkUserToken, authorize, logout };
}
