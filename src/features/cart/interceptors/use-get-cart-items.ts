import { useQuery } from "@tanstack/react-query";
import { cartQueryFn } from "../infrastructure/cart-fetcher";

interface GetCartItemsParams {
  cartId: string | undefined;
}

export const useGetCartItems = ({ cartId }: GetCartItemsParams) => {
  return useQuery({
    queryKey: ["cartItemsByCartId", cartId],
    queryFn: async () => await cartQueryFn(cartId!),
  });
};
