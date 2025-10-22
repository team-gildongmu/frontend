import { C } from "@/constant";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getCookie, setCookie, deleteCookie } from "@/hooks/useCookies";

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

  // 모든 토큰 삭제 및 로그인 페이지로 리다이렉트
  const clearAllTokensAndRedirect = () => {
    // 모든 인증 관련 쿠키 삭제
    deleteCookie(C.AUTH_TOKEN_KEY);
    deleteCookie(C.REFRESH_TOKEN_KEY);
    
    // axios 인스턴스에서 Authorization 헤더 제거
    delete axiosInstance.defaults.headers.common["Authorization"];
    
    // 로그인 페이지로 리다이렉트 (브라우저 환경에서만)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
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
    // 토큰 갱신만 프록시 사용 (쿠키 전송 보장)
    const refreshUrl = "/api/auth/refresh";

    const proxyAxios = axios.create({
      baseURL: "",
      withCredentials: true,
    });

    const response = await proxyAxios.post<RefreshResponse>(refreshUrl, null, {
      withCredentials: true,
      // 이 요청 자체가 다시 403으로 떨어져도 재귀 방지
      headers: { "X-Refresh-Attempt": "true" },
    });

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

      // refresh 엔드포인트 자체에서 에러가 난 경우 토큰 삭제 후 로그인 페이지로 리다이렉트
      const isRefreshEndpoint = (originalRequest?.url || "").includes(
        "/auth/refresh"
      );

      if (isRefreshEndpoint && (status === 401 || status === 403)) {
        // refresh API 호출 시 에러 발생 - 모든 토큰 삭제 후 로그인 페이지로 리다이렉트
        clearAllTokensAndRedirect();
        return Promise.reject(error);
      }

      if ((status === 401 || status === 403) && !isRefreshEndpoint) {
        // 무한 루프 방지
        if (originalRequest._retry) {
          return Promise.reject(error);
        }
        originalRequest._retry = true;

        // refresh 토큰 없으면 바로 실패
        const refreshToken = getCookie(C.REFRESH_TOKEN_KEY);
        if (!refreshToken) {
          // refresh token이 없으면 바로 토큰 삭제 후 로그인 페이지로 리다이렉트
          clearAllTokensAndRedirect();
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
          const error =
            refreshError instanceof Error
              ? refreshError
              : new Error(String(refreshError));
          
          // refresh 실패 시 모든 토큰 삭제 및 로그인 페이지로 리다이렉트
          clearAllTokensAndRedirect();
          
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

const apiBase = process.env.NEXT_PUBLIC_BASE_URL;

export const baseApi = axios.create({
  baseURL: apiBase,
  withCredentials: true,
});

applyInterceptors(baseApi);
