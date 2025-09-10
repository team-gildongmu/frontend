import { MyStampsResponse } from "@/types/travel";
import { baseApi } from "@/api/baseApi";

/**
 * @getMyStamps 스탬프 조회 api
 * @returns {Promise<MyStampsResponse>} - 스탬프 데이터 응답
 */

export const getMyStamps = async (): Promise<MyStampsResponse> => {
  try {
    const response = await baseApi.get<MyStampsResponse>("/travel/my_stamps");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
