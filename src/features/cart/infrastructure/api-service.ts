import { shopApi } from "../../common/data/api/axios-client";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";
import { supabaseAdmin } from "../../common/lib/supabase/server";
import { CartMapperToResponse } from "../domain/mappers/cart.mapper";
import { CartError, CartResponse } from "../domain/types/cart";

interface GetCartItemsApiService {
  getCartItems: (cartId: string) => Promise<Result<CartResponse, CartError>>;
}

export const getCartItemsApiService = (): GetCartItemsApiService => {
  async function getCartItems(
    cartId: string
  ): Promise<Result<CartResponse, CartError>> {
    const supabase = supabaseAdmin();
    try {
      const { data: items, error } = await supabase
        .from("cart_item")
        .select(
          `
        id,
        quantity,
        is_active,
        created_at,
        product:products (
          id,
          slug,
          name,
          description,
          price,
          currency,
          image_url
        )
      `
        )
        .eq("cart_id", cartId)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        return createError({
          error: error.message,
          message: "Error al obtener los items del carrito",
        });
      }

      return createSuccess(CartMapperToResponse(items));
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
