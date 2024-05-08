import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useCreateOrganization = ({ onSuccess, onError }: any) => {
  return useMutation({
    mutationFn: async (body: any) => {
      const organizationResponse = axiosInstance.post(
        "suratque/v1/organization",
        body
      );
      return organizationResponse;
    },
    onSuccess,
    onError,
  });
};
