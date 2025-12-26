import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/src/providers/supabase-provider";
import { ProductResponse } from "../domain/types/store";
import { getProductApiService } from "../infrastructure/api-service";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productService = getProductApiService();

      try {
        const result = await productService.getProducts();

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
    staleTime: 1000 * 60 * 10,
    gcTime: Infinity,
    retry: false,
  });
};
