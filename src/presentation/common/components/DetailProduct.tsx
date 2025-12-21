import { shopApi } from "@/src/data/api/axios-client";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Product, ProductByIdResponse, Banner } from "../../types/store.type";
import { DetailProductSkeleton } from "./DetailProductSkeleton";
import BannerCarousel from "./BannerCarousel";

type DetailProductProps = {
  id: string;
  isOpen: boolean;
  toggleSheet: () => void;
};

function DetailProduct({ id, isOpen, toggleSheet }: DetailProductProps) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const buscarProducto = async () => {
    try {
      setLoading(true);
      const { data: response } = await shopApi.get<ProductByIdResponse>(
        `/products/${id}`
      );

      setData(response.data);
    } catch (err) {
      console.log(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setData(null);
    setLoading(true);

    if (isOpen) {
      buscarProducto();
    }
  }, [id, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSheet}
            className="fixed inset-0 bg-black/60 z-40"
          />

          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "tween",
              ease: [0.32, 0.72, 0, 1],
              duration: 0.35,
            }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl flex flex-col max-h-[90vh]"
            style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.12)" }}
          >
            <div className="relative py-8">
              <div className="absolute inset-x-0 top-4 flex justify-center">
                <div className="w-12 h-1 bg-gray-300 rounded-full" />
              </div>
              <button
                onClick={toggleSheet}
                className="absolute right-4 top-3 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {loading || !data ? (
              <DetailProductSkeleton />
            ) : (
              <div className="flex-1 overflow-y-auto px-6 pb-6 overscroll-contain">
                {/* <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full aspect-square max-h-96 mx-auto mb-6" /> */}
                <BannerCarousel banners={data.product_images} />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold">{data.name}</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">
                      ${data.price} {data.currency}
                    </p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {data.description}
                  </p>
                </div>
                <div className="flex justify-end items-center py-4">
                  <button className="flex items-center justify-center gap-2 bg-primary text-white font-medium px-6 py-3 rounded-full shadow-lg hover:bg-primary/90 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 active:scale-95">
                    <ShoppingCart size={20} strokeWidth={2} />
                    <span>Agregar al carrito</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
export default DetailProduct;
