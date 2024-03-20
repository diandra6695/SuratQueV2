import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreatePost = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const postResponse = axiosInstance.post("/post", body);
      return postResponse;
    },
    onSuccess,
    onError,
  });
};
