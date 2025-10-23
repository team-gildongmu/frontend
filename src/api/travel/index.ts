import { baseApi } from "@/api/baseApi";
import {
  TravelCalendarReviewItem,
  TravelLogDetail,
  TravelLogItem,
  TravelLogMapInfo,
  TravelReviewDetail,
  TravelReviewItem,
  TravelReviewPost,
  TravelReviewPut,
} from "@/types/travel";

// 여행 로그 생성 요청 페이로드
// export type TravelLogCreatePayload = any;
export type TravelLogCreateCoords = { mapx: number; mapy: number };
export type TravelLogCreateSegment = {
  type?: "POI" | "MEAL" | "STAY" | "MY";
  title: string;
  desc?: string;
  reason?: string;
  image?: string;
  coords: TravelLogCreateCoords;
  provider?: "tourapi" | "google";
  source?: string;
};
export type TravelLogCreatePayload = {
  title: string;
  subtitle: string;
  theme?: string | string[];
  summary?: string;
  keywords?: string[];
  days: Array<{ segments: TravelLogCreateSegment[] }>;
  stays?: TravelLogCreateSegment[];
};
// 응답 타입 
export type TravelLogCreateResponse = { id: number };

/**
 * @createTravelLog 확정 로그 생성 api
 * @returns {Promise<TravelLogCreateResponse>} - 생성된 로그 id
 */
export const createTravelLog = async (
  payload: TravelLogCreatePayload
): Promise<TravelLogCreateResponse> => {
  try {
    const res = await baseApi.post<TravelLogCreateResponse>("/travel/log", payload);
    return res.data;
  } catch (err: unknown) {
    // 422면 pydantic 에러가 detail에 들어옴
    // const detail = err?.response?.data ?? err?.message;
    let detail: unknown = "Request failed";
    if (typeof err === "object" && err !== null) {
      const e = err as { response?: { data?: unknown }; message?: string };
      detail = e.response?.data ?? e.message ?? detail;
    }    
    console.log(detail);
    throw new Error(typeof detail === "string" ? detail : JSON.stringify(detail));
  }
};

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
      throw error;
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
 */
export const postReview = async (reviewData: TravelReviewPost) => {
  try {
    const formData = new FormData();

    formData.append("travel_log_id", reviewData.travel_log_id.toString());
    formData.append("title", reviewData.title);
    formData.append("ai_rating", reviewData.ai_rating.toString());
    formData.append("started_at", reviewData.started_at);
    formData.append("finished_at", reviewData.finished_at);
    formData.append("weather", reviewData.weather);
    formData.append("mood", reviewData.mood.toString());
    formData.append("note", reviewData.note);
    formData.append("song", reviewData.song);
    // 태그
    reviewData.tag.forEach((t) => formData.append("tag", t));
    // 파일
    reviewData.picture?.forEach((file) => formData.append("picture", file));
    await baseApi.post(`/travel/review`, formData);
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

/**
 * @putReview 여행 리뷰 수정 api
 * @param {object} reviewData - 리뷰 내용 (ex: { content, rating })
 */
export const putReview = async (reviewData: TravelReviewPut) => {
  try {
    const formData = new FormData();

    formData.append("review_id", reviewData.review_id.toString());
    formData.append("title", reviewData.title);
    formData.append("ai_rating", reviewData.ai_rating.toString());
    formData.append("started_at", reviewData.started_at);
    formData.append("finished_at", reviewData.finished_at);
    formData.append("weather", reviewData.weather);
    formData.append("mood", reviewData.mood.toString());
    formData.append("note", reviewData.note);
    formData.append("song", reviewData.song);
    reviewData.tag.forEach((t) => formData.append("tag", t));
    reviewData.picture?.forEach((file) => formData.append("picture", file));

    await baseApi.put(`/travel/review`, formData);
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};


/**
 * @deleteReview 여행 리뷰 삭제 api
 */
export const deleteReview = async (review_id: number) => {
  try {
    await baseApi.delete(`/travel/review/${review_id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};