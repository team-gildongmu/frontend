import { getMyStamps } from "@/api/stamps";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetMyStampsQuery() {
  return useQuery({
    queryKey: ["myStamps"],
    queryFn: () => getMyStamps(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
}
