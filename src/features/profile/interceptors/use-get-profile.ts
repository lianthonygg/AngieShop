import { useQuery } from "@tanstack/react-query";
import { ProfileResponse } from "../domain/types/profile";
import { getProfileApiService } from "../infrastructure/api-service";
import { supabase } from "@/src/features/common/presentation/providers/supabase-provider";

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const profileService = getProfileApiService();

      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (!error && user) {
          return user as ProfileResponse;
        }
      } catch (err: any) {
        throw new Error(
          "No se puede establecer conexion" + (err.message || err)
        );
      }
    },
    staleTime: 1000 * 60 * 10,
    gcTime: Infinity,
    retry: false,
  });
};
