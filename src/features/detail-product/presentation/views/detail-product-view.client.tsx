"use client";
import { DetailProductSkeleton } from "@/src/features/detail-product/presentation/components/DetailProductSkeleton";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import BannerCarousel from "@/src/features/common/presentation/components/BannerCarousel";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { DetailProductResponse } from "../../domain/types/detail.types";
import Header from "../components/Header";
import { cartItemAdd } from "../../infrastructure/cart-item-add";
import { CreateCartItemRequest } from "@/src/features/common/domain/validations/create-cartitem.validation";

const DetailProductViewClient = ({
  response,
}: {
  response: DetailProductResponse;
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCartAdd = async (
    cartId: string,
    productId: string,
    quantity: number,
  ) => {
    let request: CreateCartItemRequest = {
      product_id: productId,
      quantity: quantity,
    };

    await cartItemAdd(request, cartId);
  };

  const handleNavigateTo = (url: string) => {
    router.push(url);
  };

  const handleSubmit = async (quantity: number) => {
    await handleCartAdd(
      session?.user.cartId ?? "",
      response?.data.id ?? "",
      quantity,
    );
    toast.success("Producto Agregado al Carrito");
    handleNavigateTo("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pb-24">
        {!response ? (
          <DetailProductSkeleton />
        ) : (
          <div className="px-6 pt-6">
            <BannerCarousel banners={response.data.product_images} />

            <div className="mt-6 space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {response.data.name}
                </h2>
                <p className="text-3xl font-bold text-angie-pink mt-3">
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

      {response && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={async () => {
              if (session == null) {
                toast.error("Inicia sesión para agregar productos al carrito");
              } else {
                await handleSubmit(1);
              }
            }}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--angie-pink-start)] to-[var(--angie-pink-end)] text-white font-medium px-6 py-4 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300"
          >
            <ShoppingCart size={22} strokeWidth={2} />
            <span className="text-lg">Agregar al carrito</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailProductViewClient;
