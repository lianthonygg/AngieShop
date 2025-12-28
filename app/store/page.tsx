import { getProductApiService } from "@/src/features/store/infrastructure/api-service";
import { productsQueryFn } from "@/src/features/store/infrastructure/product-fetcher";
import { bannersMock } from "@/src/features/store/presentation/mock/banner.mock";
import StoreView from "@/src/features/store/presentation/views/store-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function HomePage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: productsQueryFn,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <head>
        <link
          rel="preload"
          as="image"
          href={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/render/image/public/${bannersMock[0].image_url}?width=768&resize=contain&quality=85`}
          fetchPriority="high"
        />
      </head>
      <StoreView />
    </HydrationBoundary>
  );
}
