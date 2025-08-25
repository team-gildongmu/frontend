import { useCookies } from "react-cookie";
import { C } from "@/constant";

export default function useAuth() {
  const [cookies] = useCookies([C.AUTH_TOKEN_KEY]);
  const authToken = cookies[C.AUTH_TOKEN_KEY];

  const getUserToken = () => {
    return authToken;
  };

  const authorize = (token: string) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 365);

    cookies.set(C.AUTH_TOKEN_KEY, token, {
      path: "/",
      expires: expirationDate,
    });
  };

  const logout = async (redirect = "/") => {
    cookies.remove(C.AUTH_TOKEN_KEY, { path: "/" });

    window.location.replace(redirect);
  };

  return { getUserToken, authorize, logout };
}
