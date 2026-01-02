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
    return (
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-t from-[var(--angie-soft-start)] to-[var(--angie-white)]">
        <Header />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-6xl mb-4">😞</span>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Algo salió mal
          </h2>

          <p className="text-gray-500 text-sm">Inténtalo de nuevo más tarde.</p>
        </section>
      </div>
    );
  }

  return <StoreView products={products} />;
}
