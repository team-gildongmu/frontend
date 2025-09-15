import { patchStamp } from "@/api/stamps";
import { useMutation } from "@tanstack/react-query";

export default function usePatchStampMutation() {
  return useMutation({
    mutationFn: ({ stamp_id }: { stamp_id: number }) => patchStamp(stamp_id),
  });
}
