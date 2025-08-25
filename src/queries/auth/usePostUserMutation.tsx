import { getKakaoLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export const usePostUserMutation = () => {
  return useMutation({
    mutationKey: ["fetchUser"],
    mutationFn: (code: string) => getKakaoLogin(code),
    onSuccess: (res) => {
      if (res.success && res.data) {
        console.log("로그인 성공, 토큰 저장 완료");
      }
    },
  });
};
