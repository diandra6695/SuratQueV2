import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const userResponse = axiosInstance.post("/user", body);
      return userResponse;
    },
    onSuccess,
    onError,
  });
};
