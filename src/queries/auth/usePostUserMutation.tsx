import { getKakaoLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

export const usePostUserMutation = () => {
  const { authorize } = useAuth();

  return useMutation({
    mutationKey: ["fetchUser"],
    mutationFn: (code: string) => getKakaoLogin(code),
    onSuccess: (res) => {
      if (res.success && res.data) {
        authorize(res.data.accessToken);
        console.log("로그인 성공, 토큰 저장 완료");
      }
    },
  });
};
