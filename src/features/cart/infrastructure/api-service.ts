import { shopApi } from "../../common/data/api/axios-client";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";

interface GetCartItemsApiService {
  getCartItems: (cartId: string) => Promise<Result<CartResponse, CartError>>;
}

export const getCartItemsApiService = (): GetCartItemsApiService => {
  async function getCartItems(
    cartId: string
  ): Promise<Result<CartResponse, CartError>> {
    try {
      const { data } = await shopApi.get<CartResponse>(`/cart-items/${cartId}`);
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
    getCartItems,
  };
};
