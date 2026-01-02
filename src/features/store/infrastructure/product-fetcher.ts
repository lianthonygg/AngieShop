import { getProductApiService } from "../infrastructure/api-service";

export const productsFetcher = async () => {
  const productService = getProductApiService();
  const result = await productService.getProducts();

  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.error.message || "Error al obtener productos");
  }
};
