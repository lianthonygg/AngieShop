import { ProductResponse } from "../types/store.types";
import { Product } from "@/src/features/common/domain/types/common.types";

export const ProductMapper = (products: any[]): ProductResponse => {
  let data: Product[] = [];

  products.forEach((prod) => {
    let productItem = {
      id: prod.id,
      slug: prod.slug,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      currency: prod.currency,
      category: prod.product_categories[0].categories.name,
      image_url: prod.image_url,
      is_active: prod.is_active,
      created_at: prod.created_at,
      product_images: prod.product_images,
    } as Product;

    data.push(productItem);
  });

  const productosPorCategoria = data.reduce(
    (acc: Record<string, Product[]>, producto) => {
      const categoria = producto.category;

      if (!acc[categoria]) {
        acc[categoria] = [];
      }

      acc[categoria].push(producto);

      return acc;
    },
    {}
  );

  return { data: productosPorCategoria };
};
