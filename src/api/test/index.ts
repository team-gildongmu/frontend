import { APIResponse } from "@/types/apiResponse";
import { baseApi } from "../baseApi";

/**
 * @getTestData test api
 * @returns APIResponse<T>
 */

export const getTestData = async <T>(): Promise<APIResponse<T>> => {
  try {
    const response = await baseApi.get<APIResponse<T>>("/");
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
