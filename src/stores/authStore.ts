import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import Cookies from 'js-cookie';
import { C } from '@/constants/storage';
import { KakaoLoginResponse } from '@/types/auth';

interface AuthState {
  user: KakaoLoginResponse['user'] | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  login: (userData: KakaoLoginResponse) => void;
  logout: () => void;
  setUser: (user: KakaoLoginResponse['user'] | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}

const useAuthStore = create<AuthState>()(
  devtools(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: (userData: KakaoLoginResponse) => {
        set({
          user: userData.user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      initialize: () => {
        const hasToken = !!Cookies.get(C.AUTH_TOKEN_KEY);
        if (hasToken) {
          set({
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    { name: 'auth-store' },
  ),
);

export const useAuthUser = () => useAuthStore(useShallow((store) => store.user));
export const useAuthStatus = () => useAuthStore(useShallow((store) => store.isAuthenticated));
export const useAuthLoading = () => useAuthStore(useShallow((store) => store.isLoading));
export const useAuthActions = () => useAuthStore(useShallow((store) => ({
  login: store.login,
  logout: store.logout,
  setUser: store.setUser,
  setLoading: store.setLoading,
  initialize: store.initialize,
})));

export default useAuthStore;
