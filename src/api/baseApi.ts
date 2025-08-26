import { C } from "@/constant";
import axios, { AxiosInstance } from "axios";

// 쿠키 가져오기 함수 (브라우저 환경에서만 작동)
const getCookie = (name?: string) => {
  if (typeof document !== "undefined") {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  }
  return null;
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
};

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

applyInterceptors(baseApi);
