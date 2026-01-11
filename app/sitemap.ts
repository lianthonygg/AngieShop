import { createClient } from "@supabase/supabase-js";
import { MetadataRoute } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: any[] = [];

  try {
    const { data, error } = await supabase
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

    if (!error) {
      products = data;
    }
  } catch (err) {
    console.warn("No se pudieron cargar los productos para el sitemap.");
    throw new Error("No se pudieron cargar los productos para el sitemap.");
  }

  return [
    {
      url: "https://angie-shop.vercel.app",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // {
    //   url: "https://angie-shop.vercel.app/store",
    //   lastModified: new Date(),
    //   changeFrequency: "weekly",
    //   priority: 0.9,
    // },
    ...products.map((p) => ({
      url: `https://angie-shop.vercel.app/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
