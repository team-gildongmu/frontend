import { getKakaoLogin } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

export const usePostUserMutation = () => {
  const { authorize } = useAuth();

  return useMutation({
    mutationKey: ["fetchUser"],
    mutationFn: (code: string) => getKakaoLogin(code),
    onSuccess: (res) => {
      authorize(res.access_token);
      
      console.log("로그인 성공, 토큰 저장 완료");
    },
  });
};
