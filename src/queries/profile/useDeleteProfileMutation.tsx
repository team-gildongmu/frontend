import { deleteProfile } from "@/api/profile";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteProfileMutation() {
  return useMutation({
    mutationFn: () => deleteProfile(),
  });
}
