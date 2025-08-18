import { getKakaoLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useAuthActions } from "@/stores/authStore";

export const usePostUserMutation = () => {
  const { login } = useAuthActions();

  return useMutation({
    mutationKey: ["fetchUser"],
    mutationFn: (code: string) => getKakaoLogin(code),
    onSuccess: (res) => {
      if (res.success && res.data) {
        login(res.data);
        console.log("로그인 성공, 토큰 저장 완료");
      }
    },
  });
};
