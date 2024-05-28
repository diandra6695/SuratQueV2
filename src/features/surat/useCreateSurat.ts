import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateSurat = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const suratResponse = axiosInstance.post("/surat", body);
      return suratResponse;
    },
    onSuccess,
    onError,
  });
};
