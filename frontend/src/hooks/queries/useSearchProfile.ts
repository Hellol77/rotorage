import { queryKeys } from "@/apis/querykeys";
import { searchProfile } from "@/apis/user";
import { useQuery } from "@tanstack/react-query";

export default function useSearchProfile(_id: string) {
  return useQuery({
    queryKey: queryKeys.searchProfile(_id),
    queryFn: async () => {
      const data = await searchProfile(_id);
      return data;
    },
    retry: 1,
  });
}
