import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePost = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const postResponse = await axiosInstance.patch(`/post/${body.id}`, body);

      return postResponse;
    },
    onSuccess,
  });
};
