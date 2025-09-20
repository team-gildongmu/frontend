import {  MyProfileResponse } from "@/types/profile";
import { baseApi } from "@/api/baseApi";


/**
 * @getMyProfile 프로필 조회 api
 * @returns {Promise<MyProfileResponse>} - 프로필 데이터 응답
 */

export const getMyProfile = async (): Promise<MyProfileResponse> => {
  try {
    const response = await baseApi.get<MyProfileResponse>("/profile/me");
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
 */
export const patchProfile = async ( data: FormData) => {
  try {
    const res = await baseApi.patch("/profile/edit", data)
    return res.data
    
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

/**
 * @deleteProfile 회원탈퇴 api
 */
export const deleteProfile = async () => {
  try {
    await baseApi.delete(`/profile/delete`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};