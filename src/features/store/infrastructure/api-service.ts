import {
  createError,
  createSuccess,
  Result,
} from "../../common/domain/types/result";
import { ProductError, ProductResponse } from "../domain/types/store.types";
import { supabaseAdmin } from "../../common/lib/supabase/server";
import { ProductMapper } from "../domain/mappers/product.mapper";

interface GetProductApiService {
  getProducts: () => Promise<Result<ProductResponse, ProductError>>;
}

export const getProductApiService = (): GetProductApiService => {
  async function getProducts(): Promise<Result<ProductResponse, ProductError>> {
    try {
      const { data: products, error } = await supabaseAdmin
        .from("products")
        .select(
          `
            id,
            slug,
            name,
            description,
            price,
            currency,
            image_url,
            is_active,
            sort_order
          `
        )
        .order("sort_order", { ascending: true });

      if (error) {
        return createError({
          error: error.message,
          message: "Error al obtener los productos",
        });
      }

      return createSuccess(ProductMapper(products));
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
