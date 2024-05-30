import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSurat = ({ onSuccess }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const postResponse = await axiosInstance.patch(`/surat/${body.id}`, body);

      return postResponse;
    },
    onSuccess,
  });
};
