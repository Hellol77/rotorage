import { getRecentPosts } from "@/apis/post";
import { queryKeys } from "@/apis/querykeys";
import { UserDataContext } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function useGetRecentPosts() {
  const { accessToken } = useContext(UserDataContext);
  return useQuery({
    queryKey: [queryKeys.recentPosts],
    queryFn: async () => {
      const res = await getRecentPosts(accessToken);
      return res;
    },
    enabled: !!accessToken || accessToken === "logout",
  });
}
