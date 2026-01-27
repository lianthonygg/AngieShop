"use server";
import { getProductApiService } from "../infrastructure/api-service";

export const searchProducts = async (query: string) => {
  const productService = getProductApiService();
  const result = await productService.searchProducts(query);

  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.error.message || "Error al obtener productos");
  }
};
