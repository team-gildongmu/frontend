import axios from "axios";
import { tokenStorage } from "@/utils/tokenStorage";

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

baseApi.interceptors.request.use(
  (config) => {
    const accessToken = tokenStorage.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // 토큰이 만료된 경우 로그아웃 처리
      tokenStorage.clearTokens();
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
