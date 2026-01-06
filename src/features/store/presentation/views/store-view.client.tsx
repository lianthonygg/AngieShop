"use client";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import ProductCard from "../components/ProductCard";
import { Heart } from "lucide-react";
import { bannersMock } from "../mock/banner.mock";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import Header from "../components/Header";
import BannerCarousel from "@/src/features/common/presentation/components/BannerCarousel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProductResponse } from "../../domain/types/store.types";

interface StoreViewClientProps {
  products: ProductResponse;
}

const StoreViewClient = ({ products }: StoreViewClientProps) => {
  const router = useRouter();

  const handleNavigateTo = (url: string) => {
    router.prefetch(url);
    router.push(url);
  };

  return (
    <div className={`w-full min-h-screen`}>
      {/* <PageTransition /> */}
      <Header />

      <main className="md:max-w-4xl mx-auto px-3 pt-3 pb-20">
        <BannerCarousel banners={bannersMock} />
        {!products && (
          <section className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </section>
        )}
        <section className="grid grid-cols-2 gap-3">
          {products?.data.map((product, index) => (
            <ProductCard
              key={product.id}
              index={index}
              slug={product.slug}
              src={product.image_url}
              alt={product.name}
              title={product.name}
              price={product.price}
              currency={product.currency}
              openDetail={(slug) => {
                handleNavigateTo(`/product/${slug}`);
              }}
            />
          ))}
        </section>
      </main>
      <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                <p className="text-lg font-semibold text-gray-800">
                  Hecho con amor para ti
                </p>
              </div>
              <p className="text-sm text-gray-600 max-w-xs">
                Angie Shop es más que una tienda: es una experiencia pensada en
                vos, con productos seleccionados y atención personalizada.
              </p>

              <div className="flex gap-5 mt-6">
                <a
                  href="#"
                  className="text-gray-500 hover:text-pink-600 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.04c-5.5 0-9.96 4.46-9.96 9.96 0 4.41 3.59 8.07 8.16 8.88v-6.27h-2.45v-2.61h2.45v-1.99c0-2.43 1.49-3.76 3.65-3.76.71 0 1.46.13 1.46.13v2.41h-.82c-.81 0-1.06.5-1.06 1.01v1.21h1.81l-.29 2.61h-1.52v6.27c4.57-.81 8.16-4.47 8.16-8.88 0-5.5-4.46-9.96-9.96-9.96z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-pink-600 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 2c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3.483-12c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-3.483 7c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5zm0-8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
                  </svg>
                </a>
                {/* <a
                  href="https://wa.me/5491112345678"
                  target="_blank"
                  className="text-gray-500 hover:text-green-600 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.446.099-.149.05-.248-.025-.347-.074-.099-.67-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.174-.008-.347-.008-.52-.008-.198 0-.52.074-.794.372-.297.297-1.041 1.016-1.041 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                </a> */}
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-bold text-gray-800 mb-4">Enlaces útiles</h3>
              <nav className="flex flex-col gap-3 text-sm">
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 hover:text-pink-600 transition"
                >
                  Política de Privacidad
                </Link>
                <Link
                  href="/terms-of-service"
                  className="text-gray-600 hover:text-pink-600 transition"
                >
                  Términos y Condiciones
                </Link>
              </nav>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h3 className="font-bold text-gray-800 mb-4">Contacto</h3>
              <div className="text-sm text-gray-600 space-y-2">
                <p>
                  Email:{" "}
                  <a
                    href="mailto:angie@gmail.com"
                    className="text-pink-600 hover:underline"
                  >
                    angieshopcuba@gmail.com
                  </a>
                </p>
                <p>Horario: Lunes a Sábado 10hs - 20hs</p>
              </div>
            </div>
          </div>

          {/* Copyright final */}
          <div className="border-t border-gray-200 mt-10 pt-6 text-center">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Angie Shop. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </footer>
      <BottomBar />
    </div>
  );
};

export default StoreViewClient;
