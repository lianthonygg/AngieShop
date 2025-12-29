"use client";
import BannerCarousel from "@/src/features/store/presentation/components/BannerCarousel";
import { DetailProductSkeleton } from "@/src/features/detail-product/presentation/components/DetailProductSkeleton";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useGetDetail } from "../../interceptors/use-get-detail";
import { useRouter } from "next/navigation";

const DetailProductView = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { data: response, isLoading } = useGetDetail({ slug });

  const handleNavigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="relative flex items-center justify-center py-4">
          <button
            onClick={() => router.back()}
            className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Atrás"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-lg font-medium">Detalles del producto</h1>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="pb-24">
        {" "}
        {/* Espacio extra para el botón flotante si lo quieres */}
        {isLoading || !response ? (
          <DetailProductSkeleton />
        ) : (
          <div className="px-6 pt-6">
            {/* Carrusel de imágenes */}
            <BannerCarousel banners={response.data.product_images} />

            {/* Información del producto */}
            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {response.data.name}
                </h2>
                <p className="text-3xl font-bold text-green-600 mt-3">
                  ${response.data.price} {response.data.currency}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {response.data.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Botón de agregar al carrito - fijo en la parte inferior */}
      {!isLoading && response && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <button className="w-full flex items-center justify-center gap-3 bg-primary text-white font-medium px-6 py-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300">
            <ShoppingCart size={22} strokeWidth={2} />
            <span className="text-lg">Agregar al carrito</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailProductView;
