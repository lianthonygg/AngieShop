"use client";
import { shopApi } from "@/src/data/api/axios-client";
import BannerCarousel from "@/src/presentation/common/components/BannerCarousel";
import BottomBar from "@/src/presentation/common/components/BottomBar";
import DetailProduct from "@/src/presentation/common/components/DetailProduct";
import { PageTransition } from "@/src/presentation/common/components/PageTransition";
import ProductCard from "@/src/presentation/common/components/ProductCard";
import { ProductCardSkeleton } from "@/src/presentation/common/components/ProductCardSkeleton";
import {
  Banner,
  Product,
  ProductResponse,
} from "@/src/presentation/types/store.type";
import axios from "axios";
import { Raleway, Nunito_Sans, Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";

const raleway = Raleway({
  variable: "--font-gest-raleway",
  weight: "800",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-gest-sans",
  weight: "300",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-gest-poppins",
  subsets: ["latin"],
  weight: "200",
});

const banners: Banner[] = [
  {
    id: 1,
    image_url: "product-images/tecnology-banner.avif",
    slug: "Tecnologia",
  },
  {
    id: 2,
    image_url: "product-images/perfumes-banner.avif",
    slug: "Perfumeria",
  },
];

function HomePage() {
  const [data, setData] = useState<Product[]>();
  const [isOpen, setIsOpen] = useState(false);
  const [detailId, setDetailId] = useState("");

  const toggleSheet = () => {
    setIsOpen(!isOpen);
  };

  const router = useRouter();

  const buscarProductos = async () => {
    try {
      const { data } = await shopApi.get<ProductResponse>("/products");

      setData(data.data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;

        if (status === 401) {
          navigateTo("/login");
        }
      }
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
    };
  }, [isOpen]);

  useEffect(() => {
    buscarProductos();
  }, []);

  const navigateTo = (url: string) => {
    router.push(url);
  };

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
        <BannerCarousel banners={banners} />
        {!data && (
          <section className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} />
            ))}
          </section>
        )}
        <section className="grid grid-cols-2 gap-3">
          {data?.map((product) => (
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
                setDetailId(product.id);
                toggleSheet();
              }}
            />
          ))}
        </section>
      </main>
      <DetailProduct isOpen={isOpen} toggleSheet={toggleSheet} id={detailId} />
      <BottomBar />
    </div>
  );
}

export default HomePage;
