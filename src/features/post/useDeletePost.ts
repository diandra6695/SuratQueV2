import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeletePost = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (id) => {
      const productsResponse = await axiosInstance.delete(`/post/${id}`);

      return productsResponse;
    },
    onSuccess,
  });
};
