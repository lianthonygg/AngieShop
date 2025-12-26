"use client";

import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import BannerCarousel from "../components/BannerCarousel";
import { bannersMock } from "../mock/banner.mock";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { useProducts } from "../hooks/useProducts";
import { nunito, poppins, raleway } from "../hooks/useFonts";

const StoreView = () => {
  const { data, handleDetailId } = useProducts();

  return (
    <div className={`w-full min-h-screen`}>
      {/* <PageTransition /> */}
      <header className="py-4 px-2 flex md:justify-around items-center gap-4 font-bold sticky top-0 bg-white z-40 shadow-lg">
        <div className="flex items-center flex-1 gap-2">
          <img
            src="/logo.png"
            alt="Logo Angie Shop"
            className="w-10 h-10 object-contain"
          />
          <span className={`${raleway.className} text-xl`}>Angie Shop</span>
        </div>
        <input
          type="text"
          className={`${poppins.className} hidden md:block px-3 py-1 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary flex-shrink-0`}
          placeholder="Buscar"
        />

        <button
          type="button"
          className="md:hidden bg-white text-white px-4 py-2 rounded-xl flex items-center justify-center"
          aria-label="Buscar"
          // onClick={() => }
        >
          <Search size={25} strokeWidth={2} color="#000" />
        </button>
      </header>

      <main className="md:max-w-4xl mx-auto px-3 pt-3 pb-20">
        <BannerCarousel banners={bannersMock} />
        {!data?.data && (
          <section className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </section>
        )}
        <section className="grid grid-cols-2 gap-3">
          {data?.data.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              font={nunito}
              src={product.image_url}
              alt={product.name}
              title={product.name}
              price={product.price}
              currency={product.currency}
              openSheet={() => {
                handleDetailId(product.id);
              }}
            />
          ))}
        </section>
      </main>
      <BottomBar />
    </div>
  );
};

export default StoreView;
