import type { Metadata } from "next";
import { detailFetcher } from "@/src/features/detail-product/infrastructure/detail-fetcher";
import DetailProductView from "@/src/features/detail-product/presentation/views/detail-product-view";
import { DetailProductResponse } from "@/src/features/detail-product/domain/types/detail.types";
import ErrorSection from "@/src/features/common/presentation/components/Error";
import Header from "@/src/features/detail-product/presentation/components/Header";
import { supabaseAdmin } from "@/src/features/common/lib/supabase/server";

export async function generateStaticParams() {
  const { data: products, error } = await supabaseAdmin
    .from("products")
    .select(
      `
              id,
              slug,
              name,
              description,
              price,
              currency,
              image_url,
              is_active,
              sort_order
            `
    )
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error("Error al obtener los productos");
  }

  return products.map((product) => ({
    slug: product.slug,
  }));
}

const ProductDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  let product: DetailProductResponse;

  try {
    product = await detailFetcher(slug?.toString() ?? "");
  } catch (err) {
    return <ErrorSection header={<Header />} />;
  }

  return <DetailProductView response={product} />;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await detailFetcher(slug?.toString() ?? "");
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
