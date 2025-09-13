import { baseApi } from "@/api/baseApi";

/**
 * @getLogList 확정 로그 조회 api
 * @returns {Promise<any>} - 확정 로그 데이터 응답
 */

export const getLogList = async (): Promise<any> => {
  try {
    const response = await baseApi.get<any>("/travel/log/list");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
