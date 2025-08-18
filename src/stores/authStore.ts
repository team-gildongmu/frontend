import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { tokenStorage } from '@/utils/tokenStorage';
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
        tokenStorage.setTokens(userData.accessToken);
        set({
          user: userData.user,
          isAuthenticated: true,
        });
      },

      logout: () => {
        tokenStorage.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
        });
        window.location.href = '/login';
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
        const hasTokens = tokenStorage.hasTokens();
        if (hasTokens) {
          // 여기서 사용자 정보를 가져오는 API를 호출할 수 있습니다
          // 현재는 토큰만 확인하고 인증 상태를 true로 설정
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

// 효율적인 selector hooks
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
