import ErrorSection from "@/src/features/common/presentation/components/Error";
import { ProductResponse } from "@/src/features/store/domain/types/store.types";
import { productsFetcher } from "@/src/features/store/infrastructure/product-fetcher";
import Header from "@/src/features/store/presentation/components/Header";
import { ProductCardSkeleton } from "@/src/features/store/presentation/components/ProductCardSkeleton";
import { StoreView } from "@/src/features/store/presentation/views/store-view";
import { Suspense } from "react";

export const metadata = {
  title: "Angie Shop | Tienda Online en Matanzas, Cuba",
  description:
    "Compra en Angie Shop, tu tienda online en Matanzas, Cuba con productos variados, regalos, tecnología, perfumes y artículos para el hogar al mejor precio.",
};

export default async function HomePage() {
  let products: ProductResponse;

  try {
    products = await productsFetcher();
  } catch (err) {
    return <ErrorSection header={<Header onToggle={() => {}} />} />;
  }

  return (
    <Suspense
      fallback={
        <section className="grid grid-cols-2 gap-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <ProductCardSkeleton key={`skeleton-${index}`} />
          ))}
        </section>
      }
    >
      <StoreView products={products} />
    </Suspense>
  );
}
