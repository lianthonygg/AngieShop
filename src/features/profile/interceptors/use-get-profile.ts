import { useQuery } from "@tanstack/react-query";
import { ProfileResponse } from "../domain/types/profile";
import { getProfileApiService } from "../infrastructure/api-service";

export const useGetProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async (): Promise<ProfileResponse> => {
      const profileService = getProfileApiService();

      try {
        const result = await profileService.getProfile();

        if (result.success) {
          return result.data;
        } else {
          throw new Error(result.error.message);
        }
      } catch (err: any) {
        throw new Error(
          "No se puede establecer conexion" + (err.message || err)
        );
      }
    },
    enabled,
    retry: false,
  });
};
