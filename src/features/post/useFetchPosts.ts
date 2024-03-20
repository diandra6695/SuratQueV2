import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const postsResponse = await axiosInstance.get("/post");
      return postsResponse;
    },
    queryKey: ["fetch.post"],
  });
  return {
    data,
    isLoading,
    refetch,
  };
};
