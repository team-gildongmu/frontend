import { MyProfileRequest, MyProfileResponse } from "@/types/profile";
import { baseApi } from "@/api/baseApi";

/**
 * @getMyProfile 프로필 조회 api
 * @returns {Promise<MyProfileResponse>} - 프로필 데이터 응답
 */

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  try {
    const response = await baseApi.get<MyProfileResponse>("/profile/me");
    console.log("response.data 확인용", response.data);
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
 * @patchProfile 프로필 수정 api
 * @returns {Promise<MyProfileRequest>} - 프로필 수정 데이터 응답
 */

export const patchProfile = async (data: Partial<MyProfileRequest>): Promise<MyProfileRequest> => {
  try {
    const response = await baseApi.patch<MyProfileRequest>(
      `/profile/edit`, data
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
 * @deleteProfile 프로필 삭제 api
 */
export const deleteProfile = async () => {
  try {
    await baseApi.delete(
      `/profile/delete`
    );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};