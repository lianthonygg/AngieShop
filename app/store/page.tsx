import { productsQueryFn } from "@/src/features/store/infrastructure/product-fetcher";
import StoreView from "@/src/features/store/presentation/views/store-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const metadata = {
  title: "Tienda | Angie Shop",
  description: "Tienda de Angie Shop",
};

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: productsQueryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoreView />
    </HydrationBoundary>
  );
}
