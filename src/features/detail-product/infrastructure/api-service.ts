import { shopApi } from "../../common/data/api/axios-client";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";
import {
  DetailProductError,
  DetailProductResponse,
} from "../domain/types/detail.types";

interface GetDetailProductApiService {
  getProductBySlug: (
    slug: string
  ) => Promise<Result<DetailProductResponse, DetailProductError>>;
}

export const getDetailProductApiService = (): GetDetailProductApiService => {
  async function getProductBySlug(
    slug: string
  ): Promise<Result<DetailProductResponse, DetailProductError>> {
    try {
      const { data } = await shopApi.get<DetailProductResponse>(
        `/products/${slug}`
      );
      return createSuccess(data);
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al obtener el detalle del producto",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al obtener el detalle del producto",
        });
      }
    }
  }

  return {
    getProductBySlug,
  };
};
