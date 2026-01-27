"use server";

import { CreateCartItemRequest } from "../../common/domain/validations/create-cartitem.validation";
import { detailProductApiService } from "./api-service";

export const cartItemAdd = async (
  cartItem: CreateCartItemRequest,
  cartId: string,
) => {
  const detailProductService = detailProductApiService();
  const result = await detailProductService.createCartItem(cartId, cartItem);

  if (result.success) {
    return result.data;
  } else {
    throw new Error(result.error.message);
  }
};
