import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches the user data for the provided userId.
 *
 * @param userId - The ID of the user to fetch data for.
 * @returns A React Query hook that provides the user data and loading/error state.
 */
export const useGetUser = () => {
  return useQuery({
    queryKey: ["userFromDatabase"],
    queryFn: async () => {
      const user = await axiosInstance.get("/user");
      return user;
    },
  });
};
