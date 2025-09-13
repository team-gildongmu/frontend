import { baseApi } from "@/api/baseApi";

// 여행 로그 데이터 타입 정의
interface TravelLog {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  images: string[];
}

interface TravelLogResponse {
  data: TravelLog[];
  message: string;
  status: number;
}

/**
 * @getLogList 확정 로그 조회 api
 * @returns {Promise<TravelLogResponse>} - 확정 로그 데이터 응답
 */

export const getLogList = async (): Promise<TravelLogResponse> => {
  try {
    const response = await baseApi.get<TravelLogResponse>("/travel/log/list");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
