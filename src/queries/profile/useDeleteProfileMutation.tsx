import { deleteProfile } from "@/api/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function useDeleteProfileMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => deleteProfile(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myProfile"] });
      router.push("/");
      alert("회원탈퇴가 완료되었습니다.");
    },
    onError: (error) => {
      console.error(error);
      alert("회원탈퇴 중 오류가 발생했습니다.");
    },
  });
}