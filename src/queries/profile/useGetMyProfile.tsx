import { getMyProfile } from "@/api/profile";
import useAuth from "@/hooks/useAuth";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function useGetMyProfileQuery() {
  const { getUserToken } = useAuth();

  return useQuery({
    queryKey: ["myProfile"],
    queryFn: () => getMyProfile(),
    placeholderData: keepPreviousData,
    enabled: !!getUserToken(),
  });
}
