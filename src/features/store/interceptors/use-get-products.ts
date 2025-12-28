import { useQuery } from "@tanstack/react-query";
import { getProductApiService } from "../infrastructure/api-service";
import { productsQueryFn } from "../infrastructure/product-fetcher";

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsQueryFn,
    staleTime: 1000 * 60 * 10,
    gcTime: Infinity,
    retry: false,
  });
};
