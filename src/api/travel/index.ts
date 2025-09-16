import { baseApi } from "@/api/baseApi";
import {
  TravelCalendarReviewItem,
  TravelLogDetail,
  TravelLogItem,
  TravelLogMapInfo,
  TravelReviewDetail,
  TravelReviewItem,
  TravelReviewPost,
} from "@/types/travel";

/**
 * @getLogList 확정 로그 조회 api
 * @param theme - 테마 카테고리
 * @returns {Promise<TravelLogItem[]>} - 확정 로그 데이터 응답
 */

export const getLogList = async (theme?: string): Promise<TravelLogItem[]> => {
  try {
    const url = theme ? `/travel/log/list?theme=${theme}` : `/travel/log/list`;
    const response = await baseApi.get<TravelLogItem[]>(url);
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


/**
 * @getReviewDetail 여행 리뷰 상세 조회 api
 * @returns {Promise<TravelReviewDetail>} - 여행 리뷰 상세 데이터 응답
 */

export const getReviewDetail = async (
  travel_review_id: number
): Promise<TravelReviewDetail> => {
  try {
    const response = await baseApi.get<TravelReviewDetail>(
      `/travel/review?travel_review_id=${travel_review_id}`
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
 * @postReview 여행 리뷰 업로드 api
 * @param {number} travel_review_id - 리뷰가 속한 여행 ID
 * @param {object} reviewData - 리뷰 내용 (ex: { content, rating })
 * @returns {Promise<TravelReviewDetail>} - 여행 리뷰 상세 데이터 응답
 */
export const postReview = async (
  travel_log_id: number,
  reviewData: { 
    travel_log_id: number;
    title: string;
    ai_rating: number;
    started_at: string;
    finished_at: string;
    weather: string;
    mood: number;
    tag: [];
    note: string;
    song: string;
    picture: [];
   }
): Promise<TravelReviewPost> => {
  try {
    const response = await baseApi.post<TravelReviewPost>(
      `/travel/review/${travel_log_id}`,
      reviewData
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