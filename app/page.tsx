import ErrorSection from "@/src/features/common/presentation/components/Error";
import { ProductResponse } from "@/src/features/store/domain/types/store.types";
import { productsFetcher } from "@/src/features/store/infrastructure/product-fetcher";
import Header from "@/src/features/store/presentation/components/Header";
import StoreView from "@/src/features/store/presentation/views/store-view";

export const metadata = {
  title: "Angie Shop | Perfumes y Tecnología en Matanzas, Cuba",
  description:
    "Tienda online de perfumes y tecnología en Matanzas, Cuba. Encuentra las mejores ofertas en fragancias y gadgets de última generación.",
};

export default async function HomePage() {
  let products: ProductResponse;

  try {
    products = await productsFetcher();
  } catch (err) {
    return <ErrorSection header={<Header />} />;
  }

  return <StoreView products={products} />;
}
