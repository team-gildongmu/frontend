import { patchProfile } from "@/api/profile";
import { MyProfileRequest } from "@/types/profile";
import { useMutation } from "@tanstack/react-query";

export default function usePatchProfileMutation() {
  return useMutation<
    MyProfileRequest, 
    Error,
    Partial<MyProfileRequest>
  >({
    mutationFn: (data) => patchProfile(data)
  });
};