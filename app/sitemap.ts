import { productsQueryFn } from "@/src/features/store/infrastructure/product-fetcher";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: Product[] = [];

  try {
    const res = await productsQueryFn();
    products = res.data || [];
  } catch (err) {
    console.warn("No se pudieron cargar los productos para el sitemap.");
  }

  return [
    {
      url: "https://angie-shop.vercel.app",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://angie-shop.vercel.app/store",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...products.map((p) => ({
      url: `https://angie-shop.vercel.app/store/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
