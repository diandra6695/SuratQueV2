import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useGetOrganization = (id: string) => {
  return useQuery({
    queryKey: ["userFromDatabase", id],
    queryFn: async () => {
      const user = await axiosInstance.get(`/organization/user/${id}`);
      return user;
    },
  });
};
