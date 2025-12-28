import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetProducts } from "../../interceptors/use-get-products";
import { ProductResponse } from "../../domain/types/store.types";

export const useProducts = (initialProducts: ProductResponse) => {
  const router = useRouter();

  const { data, error, isLoading, refetch } = useGetProducts(initialProducts);
  const [detailId, setDetailId] = useState("");

  const handleDetailId = (id: string) => {
    setDetailId(id);
  };

  const handleNavigateTo = (url: string) => {
    router.push(url);
  };

  return {
    //values
    data,
    error,
    isLoading,
    detailId,

    //methods
    refetch,
    handleDetailId,
    handleNavigateTo,
  };
};
