import { getTestData } from "@/api/test";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetTestDataQuery = () => {
  return useQuery({
    queryKey: ["testData"],
    queryFn: () => getTestData(),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
