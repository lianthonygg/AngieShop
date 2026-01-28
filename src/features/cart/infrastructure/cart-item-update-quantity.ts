"use server";

import { getCartItemsApiService } from "./api-service";

export const updateQuantityCartItem = async (
  cartId: string,
  cartItemId: string,
  newQuantity: number,
) => {
  const cartService = getCartItemsApiService();

  try {
    const result = await cartService.updateQuantity(
      cartId,
      cartItemId,
      newQuantity,
    );
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err: any) {
    throw new Error("No se puede establecer conexion" + (err.message || err));
  }
};
