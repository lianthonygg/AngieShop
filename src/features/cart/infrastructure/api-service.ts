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
  updateQuantity: (
    cartId: string,
    cartItemId: string,
    newQuantity: number,
  ) => Promise<Result<string, CartError>>;
  deleteCartItem: (
    cartId: string,
    cartItemId: string,
  ) => Promise<Result<string, CartError>>;
  completePurchase(cartId: string): Promise<Result<string, CartError>>;
}

export const getCartItemsApiService = (): GetCartItemsApiService => {
  async function getCartItems(
    cartId: string,
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
      `,
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

  async function updateQuantity(
    cartId: string,
    cartItemId: string,
    newQuantity: number,
  ): Promise<Result<string, CartError>> {
    try {
      const supabase = supabaseAdmin();
      const { error } = await supabase
        .from("cart_item")
        .update({
          quantity: newQuantity,
        })
        .eq("id", cartItemId)
        .eq("cart_id", cartId);

      if (error) {
        return createError({
          error: error.message,
          message: "Error al actualizar la cantidad del producto",
        });
      }

      return createSuccess("Cantidad actualizada correctamente");
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al actualizar la cantidad del producto",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al actualizar la cantidad del producto",
        });
      }
    }
  }

  async function deleteCartItem(
    cartId: string,
    cartItemId: string,
  ): Promise<Result<string, CartError>> {
    try {
      const supabase = supabaseAdmin();
      const { data, error, count } = await supabase
        .from("cart_item")
        .update({ is_active: false })
        .eq("id", cartItemId)
        .select("id");

      console.log("UPDATED:", data);

      if (error) {
        return createError({
          error: error.message,
          message: "Error al eliminar el producto",
        });
      }

      return createSuccess("Producto eliminado correctamente");
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al eliminar el producto",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al eliminar el producto",
        });
      }
    }
  }

  async function completePurchase(
    cartId: string,
  ): Promise<Result<string, CartError>> {
    try {
      const supabase = supabaseAdmin();
      const { error } = await supabase
        .from("cart_item")
        .update({
          is_active: false,
        })
        .eq("cart_id", cartId);

      if (error) {
        return createError({
          error: error.message,
          message: "Error al eliminar los productos",
        });
      }

      return createSuccess("Productos eliminados correctamente");
    } catch (error: any) {
      if (error.response) {
        return createError({
          error: error.response.data,
          message: "Error al eliminar los productos",
        });
      } else if (error.request) {
        return createError({
          error: "Sin respuesta del servidor",
          message: "Error de conexion al servidor",
        });
      } else {
        return createError({
          error: error.message,
          message: "Error desconocido al eliminar los productos",
        });
      }
    }
  }

  return {
    getCartItems,
    updateQuantity,
    deleteCartItem,
    completePurchase,
  };
};
