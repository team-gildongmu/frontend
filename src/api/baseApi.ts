import { C } from "@/constant";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

// 쿠키 가져오기 함수 (브라우저 환경에서만 작동)
const getCookie = (name?: string) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  }
  return null;
};

// 쿠키 저장 유틸 (브라우저 환경에서만 작동)
const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof document === "undefined") return;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  document.cookie = `${name}=${value}; path=/; expires=${expirationDate.toUTCString()}`;
};

const applyInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    (request) => {
      const token = getCookie(C.AUTH_TOKEN_KEY);

      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }

      return request;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  let isRefreshing = false;
  let refreshSubscribers: Array<(token: string) => void> = [];
  let refreshFailureSubscribers: Array<(error: Error) => void> = [];

  const subscribeTokenRefresh = (callback: (token: string) => void) => {
    refreshSubscribers.push(callback);
  };

  const subscribeTokenRefreshFailure = (callback: (error: Error) => void) => {
    refreshFailureSubscribers.push(callback);
  };

  const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
    refreshFailureSubscribers = [];
  };

  const onRefreshFailed = (error: Error) => {
    refreshFailureSubscribers.forEach((callback) => callback(error));
    refreshSubscribers = [];
    refreshFailureSubscribers = [];
  };

  interface RefreshResponse {
    access_token?: string;
  }

  const refreshAccessToken = async (): Promise<string> => {
    // refresh 토큰은 쿠키로 전송되므로 body 필요 없음
    const response = await axiosInstance.post<RefreshResponse>(
      "/auth/refresh",
      null,
      {
        withCredentials: true,
        // 이 요청 자체가 다시 403으로 떨어져도 재귀 방지
        headers: { "X-Refresh-Attempt": "true" },
      }
    );

    // 백엔드 응답 형태에 맞춰 access_token 추출
    const data: RefreshResponse = response.data;
    const maybeToken = data?.access_token;
    if (!maybeToken) {
      throw new Error("Failed to refresh access token: empty token");
    }
    const newAccessToken: string = maybeToken;

    // 쿠키에 저장
    setCookie(C.AUTH_TOKEN_KEY, newAccessToken);

    // axios 인스턴스 기본 헤더 갱신
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;

    return newAccessToken;
  };

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig & {
        _retry?: boolean;
        _isRefreshCall?: boolean;
      } = error?.config ?? {};
      const status: number | undefined = error?.response?.status;

      // refresh 엔드포인트 자체에서 에러가 난 경우는 그대로 종료
      const isRefreshEndpoint = (originalRequest?.url || "").includes(
        "/auth/refresh"
      );

      if (status === 403 && !isRefreshEndpoint) {
        // 무한 루프 방지
        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        // refresh 토큰 없으면 바로 실패
        const refreshToken = getCookie(C.REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // 이미 갱신 중이면 토큰 갱신 완료를 대기 후 재시도
          return new Promise((resolve, reject) => {
            subscribeTokenRefresh((newToken: string) => {
              if (!originalRequest.headers) originalRequest.headers = {};
              originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
              resolve(axiosInstance(originalRequest));
            });
            subscribeTokenRefreshFailure((error: Error) => {
              reject(error);
            });
          });
        }

        isRefreshing = true;
        try {
          const newToken = await refreshAccessToken();
          onRefreshed(newToken);

          if (!originalRequest.headers) originalRequest.headers = {};
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          const error = refreshError instanceof Error ? refreshError : new Error(String(refreshError));
          onRefreshFailed(error);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

// 프록시를 사용하여 same-origin으로 요청 (쿠키 전송 문제 해결)
const isDev = process.env.NODE_ENV === "development";
const apiBase = process.env.NEXT_PUBLIC_BASE_URL;

console.log('🔧 BaseAPI Config:', {
  isDev,
  apiBase,
  useProxy: !!apiBase
});

export const baseApi = axios.create({
  baseURL: apiBase ? "/api" : (isDev ? "/api" : apiBase),
  withCredentials: true,
});

applyInterceptors(baseApi);
