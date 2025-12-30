import { useMutation } from "@tanstack/react-query";
import { detailProductApiService } from "../infrastructure/api-service";
import { CreateCartItemRequest } from "../../common/domain/validations/create-cartitem.validation";

export const useCreateCartItem = (cartId: string) => {
  return useMutation({
    mutationFn: async (cartItem: CreateCartItemRequest) => {
      const detailProductService = detailProductApiService();
      const result = await detailProductService.createCartItem(
        cartId,
        cartItem
      );

      if (result.success) {
        return result.data;
      } else {
        throw new Error(result.error.message);
      }
    },
    onSuccess: () => {},
    onError: (error) => {
      console.error(error);
    },
  });
};
