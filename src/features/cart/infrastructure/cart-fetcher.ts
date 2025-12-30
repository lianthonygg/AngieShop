import { getCartItemsApiService } from "./api-service";

export const cartQueryFn = async (cartId: string) => {
  const cartService = getCartItemsApiService();

  try {
    const result = await cartService.getCartItems(cartId);
    if (result.success) {
      return result.data;
    } else {
      throw new Error(result.error.message);
    }
  } catch (err: any) {
    throw new Error("No se puede establecer conexion" + (err.message || err));
  }
};
