/**
 * 토큰 저장소 유틸리티 함수들
 */

import { STORAGE_KEYS } from '@/constants/storage';

export const tokenStorage = {
  // Access Token 관리
  getAccessToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  setAccessToken: (token: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  },

  removeAccessToken: (): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  },

  // 토큰 저장
  setTokens: (accessToken: string): void => {
    tokenStorage.setAccessToken(accessToken);
  },

  // 토큰 제거 (로그아웃)
  clearTokens: (): void => {
    tokenStorage.removeAccessToken();
  },

  // 토큰 존재 여부 확인
  hasTokens: (): boolean => {
    return !!tokenStorage.getAccessToken();
  },
};
