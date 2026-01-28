import { Banner } from "../../common/domain/types/common.types";
import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";
import { CreateCartItemRequest } from "../../common/domain/validations/create-cartitem.validation";
import { supabaseAdmin } from "../../common/lib/supabase/server";
import {
  DetailProductError,
  DetailProductResponse,
} from "../domain/types/detail.types";

interface DetailProductApiService {
  getProductBySlug: (
    slug: string,
  ) => Promise<Result<DetailProductResponse, DetailProductError>>;
  createCartItem: (
    cartId: string,
    cartItem: CreateCartItemRequest,
  ) => Promise<Result<string, DetailProductError>>;
}

export const detailProductApiService = (): DetailProductApiService => {
  async function getProductBySlug(
    slug: string,
  ): Promise<Result<DetailProductResponse, DetailProductError>> {
    const supabase = supabaseAdmin();
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*, product_images(*)")
        .eq("slug", slug)
        .single();

      if (error) {
        return createError({
          error: error.message,
          message: "Error al obtener los productos",
        });
      }

      return createSuccess({
        data: {
          id: data.id,
          name: data.name,
          description: data.description,
          price: data.price,
          currency: data.currency,
          image_url: data.image_url,
          product_images: data.product_images.map(
            (image: any) =>
              ({
                id: image.id,
                image_url: image.url,
                slug: image.slug,
              }) as Banner,
          ),
        },
      } as DetailProductResponse);
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
    cartItem: CreateCartItemRequest,
  ): Promise<Result<string, DetailProductError>> {
    try {
      const supabase = supabaseAdmin();
      const { data, error } = await supabase
        .from("cart_item")
        .insert([
          {
            cart_id: cartId,
            product_id: cartItem.product_id,
            quantity: cartItem.quantity,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error(error);
        return createError({
          error: error.message,
          message: "Error al agregar el producto al carrito",
        });
      }

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
