import { shopApi } from "@/src/features/common/data/api/axios-client";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";
import { ProductError, ProductResponse } from "../domain/types/store.types";

interface GetProductApiService {
  getProducts: () => Promise<Result<ProductResponse, ProductError>>;
}

export const getProductApiService = (): GetProductApiService => {
  async function getProducts(): Promise<Result<ProductResponse, ProductError>> {
    try {
      const { data } = await shopApi.get<ProductResponse>(`/products`);
      return createSuccess(data);
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al obtener los datos del perfil",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al obtener los datos del perfil",
        });
      }
    }
  }

  return {
    getProducts,
  };
};
