import { MyStampsResponse, StampDetectResponse } from "@/types/stamp";
import { baseApi } from "@/api/baseApi";

/**
 * @getMyStamps 스탬프 조회 api
 * @returns {Promise<MyStampsResponse>} - 스탬프 데이터 응답
 */

export const getMyStamps = async (): Promise<MyStampsResponse> => {
  try {
    const response = await baseApi.get<MyStampsResponse>("/stamps/my_stamps");
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
 * @getStampDetect 5km 이내 찍을 수 있는 스탬프 조회 api
 * @param latitude - 위도
 * @param longitude - 경도
 * @returns {Promise<StampDetectResponse>} - 5km 이내 찍을 수 있는 스탬프 데이터 응답
 */

export const getStampDetect = async (
  latitude: number,
  longitude: number
): Promise<StampDetectResponse> => {
  try {
    const response = await baseApi.get<StampDetectResponse>(
      `/stamps/collectable?latitude=${latitude}&longitude=${longitude}`
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
 * @getStampDetect 스탬프 찍기 api
 * @param stamp_id - 스탬프 id
 * @returns {Promise<StampDetectResponse>} - 스탬프 찍기 데이터 응답
 */

export const patchStamp = async (
  stamp_id: number
): Promise<StampDetectResponse> => {
  try {
    const response = await baseApi.patch<StampDetectResponse>(
      `/stamps/${stamp_id}/mark-completed`
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
