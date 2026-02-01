export const revalidate = 300;

import type { Metadata } from "next";
import { detailFetcher } from "@/src/features/detail-product/infrastructure/detail-fetcher";
import { DetailProductView } from "@/src/features/detail-product/presentation/views/detail-product-view";
import { DetailProductResponse } from "@/src/features/detail-product/domain/types/detail.types";
import ErrorSection from "@/src/features/common/presentation/components/Error";
import Header from "@/src/features/detail-product/presentation/components/Header";
import { supabaseAdmin } from "@/src/features/common/lib/supabase/server";
import { Suspense } from "react";
import { DetailProductSkeleton } from "@/src/features/detail-product/presentation/components/DetailProductSkeleton";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const supabase = await supabaseAdmin();

  const { data: products, error } = await supabase
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
      `,
    )
    .eq("is_active", true)
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

  if (!product || !product.data.is_active) {
    notFound();
  }

  return (
    <Suspense fallback={<DetailProductSkeleton />}>
      <DetailProductView response={product} />
    </Suspense>
  );
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await detailFetcher(slug?.toString() ?? "");

  if (!product || !product.is_active) {
    return { robots: { index: false, follow: false } };
  }

  const title = `${product.name} en Cuba | Comprar Online en Angie Shop`;
  const description = `Compra ${product.name} en Angie Shop, tu tienda online en Matanzas, Cuba. Precio accesible, productos originales y entrega rápida.`;

  const imageUrl = `https://fanzjptylyuvwvlotopk.supabase.co/storage/v1/object/public/product-images/${product.image_url}`;

  return {
    title,
    description,

    keywords: [
      "Angie Shop",
      "tienda online en Cuba",
      "comprar productos en Matanzas",
      product.name,
      `comprar ${product.name}`,
      `precio de ${product.name} en Cuba`,
      `ofertas de ${product.name}`,
    ],
    openGraph: {
      title,
      description,
      url: `https://angie-shop.vercel.app/product/${slug}`,
      siteName: "Angie Shop",
      images: [
        {
          url: imageUrl,
          alt: `${product.name} en Angie Shop`,
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      type: "website",
    },

    alternates: {
      canonical: `https://angie-shop.vercel.app/product/${slug}`,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export default ProductDetail;
