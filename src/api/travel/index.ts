import { baseApi } from "@/api/baseApi";
import {
  TravelCalendarReviewItem,
  TravelLogDetail,
  TravelLogItem,
  TravelLogMapInfo,
  TravelReviewItem,
} from "@/types/travel";

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

/**
 * @getLogMapInfo 여행 로그 지도 정보 조회 api
 * @returns {Promise<TravelLogMapInfo>} - 여행 로그 지도 정보 데이터 응답
 */

export const getLogMapInfo = async (
  travel_log_id: number
): Promise<TravelLogMapInfo> => {
  try {
    const response = await baseApi.get<TravelLogMapInfo>(
      `/travel/log/map?travel_log_id=${travel_log_id}`
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

/**
 * @getReviewList 여행 리뷰 리스트 조회 api
 * @returns {Promise<TravelReviewItem[]>} - 여행 리뷰 리스트 데이터 응답
 */

export const getReviewList = async (): Promise<TravelReviewItem[]> => {
  try {
    const response = await baseApi.get<TravelReviewItem[]>(
      `/travel/review/list`
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

/**
 * @getCalendarReviewList 여행 리뷰 캘린더 조회 api
 * @returns {Promise<TravelCalendarReviewItem[]>} - 여행 리뷰 캘린더 데이터 응답
 */

export const getCalendarReviewList = async (): Promise<
  TravelCalendarReviewItem[]
> => {
  try {
    const response = await baseApi.get<TravelCalendarReviewItem[]>(
      `/travel/review/calendar`
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
