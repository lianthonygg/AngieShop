import { useSession } from "next-auth/react";
import { useGetCartItems } from "../../interceptors/use-get-cart-items";

export const useCartItems = () => {
  const { data: session, status } = useSession();

  if (status !== "authenticated" && status !== "loading") {
    return { state: false };
  }

  const { data, error, isLoading } = useGetCartItems({
    cartId: session?.user?.cartId,
  });

  const totalItems =
    data?.items?.reduce((sum, item) => sum + (item as any).quantity, 0) || 0;

  return {
    //values
    session,
    data,
    error,
    isLoading,
    totalItems,
  };
};
