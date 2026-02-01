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
import { useEffect, useState } from "react";
import SearchModal from "../components/SearchModal";
import Footer from "../components/Footer";

interface StoreViewClientProps {
  products: ProductResponse;
}

const StoreViewClient = ({ products }: StoreViewClientProps) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const handleNavigateTo = (url: string) => {
    router.prefetch(url);
    router.push(url);
  };

  return (
    <div className={`w-full min-h-screen`}>
      {/* <PageTransition /> */}
      <Header onToggle={() => setOpen(true)} />

      <main className="md:max-w-6xl mx-auto px-3 pt-3 pb-20">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Bienvenido a Angie Shop
        </h1>
        <div className="max-w-4xl mx-auto md:px-8 px-2">
          <blockquote className="italic text-center text-gray-400 text-[11px] md:text-base mb-6">
            "Descubre nuestra selección de productos únicos y exclusivos"
          </blockquote>
        </div>
        <BannerCarousel banners={bannersMock} />
        {!products && (
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </section>
        )}
        {Object.entries(products?.data).map(([categoria, productos]) => (
          <section key={categoria} className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-gray-800">
              {categoria}
            </h2>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {productos.map((product, index) => (
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
          </section>
        ))}
      </main>
      <Footer />
      <SearchModal open={open} onClose={() => setOpen(false)} />
      <BottomBar />
    </div>
  );
};

export default StoreViewClient;
