import { shopApi } from "../../common/data/api/axios-client";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";
import { CreateCartItemRequest } from "../../common/domain/validations/create-cartitem.validation";
import {
  DetailProductError,
  DetailProductResponse,
} from "../domain/types/detail.types";

interface DetailProductApiService {
  getProductBySlug: (
    slug: string
  ) => Promise<Result<DetailProductResponse, DetailProductError>>;
  createCartItem: (
    cartId: string,
    cartItem: CreateCartItemRequest
  ) => Promise<Result<string, DetailProductError>>;
}

export const detailProductApiService = (): DetailProductApiService => {
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

  async function createCartItem(
    cartId: string,
    cartItem: CreateCartItemRequest
  ): Promise<Result<string, DetailProductError>> {
    try {
      await shopApi.post(`/cart-items/${cartId}`, {
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
      });
      return createSuccess("Producto Agregado al Carrito");
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al agregar el producto al carrito",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al agregar el producto al carrito",
        });
      }
    }
  }

  return {
    getProductBySlug,
    createCartItem,
  };
};
