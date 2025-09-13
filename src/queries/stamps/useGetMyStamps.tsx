import { getMyStamps } from "@/api/stamps";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetMyStampsQuery() {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["myStamps"],
    queryFn: () => getMyStamps(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
    enabled: !!getUserToken(),
  });
}
