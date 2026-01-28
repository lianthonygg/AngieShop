"use server";

import { getCartItemsApiService } from "./api-service";

export const deleteCartItem = async (cartId: string, cartItemId: string) => {
  const cartService = getCartItemsApiService();

  try {
    const result = await cartService.deleteCartItem(cartId, cartItemId);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err: any) {
    throw new Error("No se puede establecer conexion" + (err.message || err));
  }
};
