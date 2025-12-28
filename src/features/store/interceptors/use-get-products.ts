import { useQuery } from "@tanstack/react-query";
import { getProductApiService } from "../infrastructure/api-service";
import { productsQueryFn } from "../infrastructure/product-fetcher";
import { ProductResponse } from "../domain/types/store.types";

export const useGetProducts = (initialProducts: ProductResponse) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: productsQueryFn,
    initialData: initialProducts,
    staleTime: 1000 * 60 * 10,
    gcTime: Infinity,
    retry: false,
  });
};
