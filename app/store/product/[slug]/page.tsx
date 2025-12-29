import { detailQueryFn } from "@/src/features/detail-product/infrastructure/detail-fetcher";
import DetailProductView from "@/src/features/detail-product/presentation/views/detail-product-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Head from "next/head";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetail = async ({ params }: PageProps) => {
  const { slug } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["productBySlug", slug],
    queryFn: async () => await detailQueryFn(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Head>
        <title>product | Angie Shop</title>
      </Head>
      <DetailProductView slug={slug} />
    </HydrationBoundary>
  );
};

export default ProductDetail;
