"use client";

import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import BannerCarousel from "../components/BannerCarousel";
import { bannersMock } from "../mock/banner.mock";
import { ProductCardSkeleton } from "../components/ProductCardSkeleton";
import { useProducts } from "../hooks/useProducts";
import { nunito, poppins, raleway } from "../hooks/useFonts";
import Header from "../components/Header";

const StoreView = () => {
  const { data, handleNavigateTo } = useProducts();

  return (
    <div className={`w-full min-h-screen`}>
      {/* <PageTransition /> */}
      <Header />

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
              slug={product.slug}
              font={nunito}
              src={product.image_url}
              alt={product.name}
              title={product.name}
              price={product.price}
              currency={product.currency}
              openDetail={(slug) => {
                handleNavigateTo(`/store/product/${slug}`);
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
