import { APIResponse } from "@/types/apiResponse";
import { baseApi } from "../baseApi";
import { KakaoLoginResponse } from "@/types/auth";

/**
 * @getKakaoLogin 카카오로그인 api
 * @returns {Promise<APIResponse<T>>} - 사용자 데이터 응답
 */

export const getKakaoLogin = async (
  code: string
): Promise<APIResponse<KakaoLoginResponse>> => {
  try {
    const response = await baseApi.post<APIResponse<KakaoLoginResponse>>(
      "/auth/kakao/callback",
      {
        code,
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
