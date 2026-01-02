import type { Metadata } from "next";
import { detailQueryFn } from "@/src/features/detail-product/infrastructure/detail-fetcher";
import DetailProductView from "@/src/features/detail-product/presentation/views/detail-product-view";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

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
      <DetailProductView slug={slug} />
    </HydrationBoundary>
  );
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await detailQueryFn(slug);
  return {
    title: product.name,
    description: product.description,
    keywords: [
      "Angie Shop",
      "Tienda en línea",
      "Productos",
      "Compra",
      "Matanzas",
      "Cuba",
      product.name,
      "comprar " + product.name,
      "precio de " + product.name,
    ],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: `https://fanzjptylyuvwvlotopk.supabase.co/storage/v1/object/public/product-images/${product.image_url}`,
          alt: product.slug,
          width: 1200,
          height: 630,
        },
      ],
    },
    alternates: {
      canonical: `https://angie-shop.vercel.app/product/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [
        `https://fanzjptylyuvwvlotopk.supabase.co/storage/v1/object/public/product-images/${product.image_url}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}



export default ProductDetail;
