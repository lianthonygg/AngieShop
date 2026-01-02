import { detailProductApiService } from "./api-service";

export const detailFetcher = async (slug: string) => {
  const detailProductService = detailProductApiService();

  try {
    const result = await detailProductService.getProductBySlug(slug);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err: any) {
    throw new Error("No se puede establecer conexion" + (err.message || err));
  }
};
