import { Product } from "@/src/presentation/types/store.type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useGetProducts } from "../../interceptors/use-get-products";

export const useProducts = () => {
  const router = useRouter();

  const { data, error, isLoading, refetch } = useGetProducts();
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
