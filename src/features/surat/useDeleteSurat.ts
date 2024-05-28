import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useDeleteSurat = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (id) => {
      const suratResponse = await axiosInstance.delete(`/surat/${id}`);

      return suratResponse;
    },
    onSuccess,
  });
};
