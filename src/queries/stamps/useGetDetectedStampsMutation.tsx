import { getStampDetect } from "@/api/stamps";
import { useMutation } from "@tanstack/react-query";

export default function useGetDetectedStampsMutation() {
  return useMutation({
    mutationFn: ({ latitude, longitude }: { latitude: number; longitude: number }) =>
      getStampDetect(latitude, longitude),
  });
}
