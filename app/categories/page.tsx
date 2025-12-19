"use client";
import BottomBar from "@/src/presentation/common/components/BottomBar";
import { PageTransition } from "@/src/presentation/common/components/PageTransition";
import ProductCard from "@/src/presentation/common/components/ProductCard";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
};

function ProductPage() {
  const router = useRouter();

  const [data, setData] = useState<Product[]>();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  const buscarProductos = async () => {
    try {
      const { data } = await axios.get<Product[]>(
        "https://enviosya-backend-production.up.railway.app/products",
        { withCredentials: true }
      );

      setData(data);
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
    buscarProductos();
  }, []);

  return (
    <div className="w-full min-h-screen">
      <PageTransition />

      {!data && (
        <div className="w-full min-h-screen bg-gray-300 flex justify-center items-center text-xl">
          Cargando...
        </div>
      )}
      <div className="p-3 bg-gray-300 w-full min-h-screen flex flex-col gap-3">
        {/* {data?.map((product) => (
          <ProductCard
            key={product.id}
            src={"/next.svg"}
            alt={product.name}
            title={product.name}
            price={product.price}
          />
        ))} */}
      </div>
      <BottomBar />
    </div>
  );
}

export default ProductPage;
