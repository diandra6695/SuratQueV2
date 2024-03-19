import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsResponse = await axiosInstance.get("/post");
      return postsResponse;
    },
  });
  return {
    data,
    isLoading,
  };
};
