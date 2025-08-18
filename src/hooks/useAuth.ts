import { useShallow } from 'zustand/react/shallow';
import Cookies from 'js-cookie';

import { C } from '@/constants/storage';
import { KakaoLoginResponse } from '@/types/auth';
import useAuthStore from '@/stores/authStore';

export default function useAuth() {
  const { login, logout: resetAuth, setUser } = useAuthStore(useShallow((state) => ({
    login: state.login,
    logout: state.logout,
    setUser: state.setUser,
  })));

  const checkUserToken = (): boolean => {
    const userToken = Cookies.get(C.AUTH_TOKEN_KEY);
    return !!userToken;
  };

  const getUserToken = () => {
    return Cookies.get(C.AUTH_TOKEN_KEY);
  };

  const authenticate = async (user: KakaoLoginResponse['user']) => {
    const hasUserToken = checkUserToken();
    if (hasUserToken) setUser(user);
    else resetAuth();
  };

  const authorize = (user: KakaoLoginResponse['user'], token: string) => {
    const isLocalhost = window.location.hostname === 'localhost';
    const domain = isLocalhost ? 'localhost' : undefined;

    Cookies.set(C.AUTH_TOKEN_KEY, token, {
      expires: 7,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      domain,
    });

    const loginData: KakaoLoginResponse = {
      accessToken: token,
      user,
    };
    login(loginData);
  };

  const logout = async (redirect = '/login') => {
    const isLocalhost = window.location.hostname === 'localhost';
    const domain = isLocalhost ? 'localhost' : undefined;
    
    Cookies.remove(C.AUTH_TOKEN_KEY, { path: '/', domain });
    resetAuth();
    window.location.replace(redirect);
  };

  return { authenticate, getUserToken, checkUserToken, authorize, logout };
}
