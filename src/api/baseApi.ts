import axios from "axios";
import Cookies from "js-cookie";
import { C } from "@/constants/storage";

export const baseApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

baseApi.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get(C.AUTH_TOKEN_KEY);
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
      Cookies.remove(C.AUTH_TOKEN_KEY, { path: '/' });
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
