import { useCookies } from "react-cookie";
import { C } from "@/constant";

export default function useAuth() {
  const [cookies, setCookie, removeCookie] = useCookies([C.AUTH_TOKEN_KEY]);
  const authToken = cookies[C.AUTH_TOKEN_KEY];

  const getUserToken = () => {
    return authToken;
  };

  const authorize = (token: string, refreshToken: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);

    setCookie(C.AUTH_TOKEN_KEY, token, {
      path: "/",
      expires: expirationDate,
    });

    setCookie(C.REFRESH_TOKEN_KEY, refreshToken, {
      path: "/",
      expires: expirationDate,
    });

    if (typeof window !== 'undefined') {
      document.cookie = `${C.AUTH_TOKEN_KEY}=${token}; path=/; expires=${expirationDate.toUTCString()}`;
      document.cookie = `${C.REFRESH_TOKEN_KEY}=${refreshToken}; path=/; expires=${expirationDate.toUTCString()}`;
    }
  };

  const logout = (redirect = "/") => {
    removeCookie(C.AUTH_TOKEN_KEY, { path: "/" });
    removeCookie(C.REFRESH_TOKEN_KEY, { path: "/" });
    window.location.replace(redirect);
  };

  return { getUserToken, authorize, logout };
}
