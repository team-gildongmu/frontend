import { baseApi } from "@/api/baseApi";
import { TravelLogDetail, TravelLogItem } from "@/types/travel";

/**
 * @getLogList 확정 로그 조회 api
 * @returns {Promise<TravelLogItem[]>} - 확정 로그 데이터 응답
 */

export const getLogList = async (): Promise<TravelLogItem[]> => {
  try {
    const response = await baseApi.get<TravelLogItem[]>("/travel/log/list");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

/**
 * @getLogDetail 여행 로그 상세 조회 api
 * @returns {Promise<TravelLogDetail>} - 여행 로그 상세 데이터 응답
 */

export const getLogDetail = async (
  travel_log_id: number
): Promise<TravelLogDetail> => {
  try {
    const response = await baseApi.get<TravelLogDetail>(
      `/travel/log?travel_log_id=${travel_log_id}`
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
