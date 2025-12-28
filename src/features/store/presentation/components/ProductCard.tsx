import { Nunito_Sans } from "next/font/google";
import Image from "next/image";
import { useState } from "react";
import supabaseLoader from "../../../common/lib/supabase-loader";

const nunito = Nunito_Sans({
  variable: "--font-gest-sans",
  weight: "700",
  subsets: ["latin"],
});

type ProductCardProps = {
  index: number;
  slug: string;
  openDetail: (slug: string) => void;
  src: string;
  alt: string;
  title: string;
  price: number;
  currency: string;
};

function ProductCard({
  index,
  slug,
  openDetail,
  src,
  alt,
  title,
  price,
  currency,
}: ProductCardProps) {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div
      onClick={() => openDetail(slug)}
      className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointers"
    >
      <div className="relative w-full aspect-square overflow-hidden bg-gray-100 rounded-t-lg">
        {src ? (
          <Image
            src={`product-images/${src}`}
            alt={alt}
            fill
            loader={supabaseLoader}
            loading={index < 4 ? "eager" : "lazy"}
            priority={index < 4}
            sizes="(max-width: 768px) 45vw, 300px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="p-3">
        <h3 className={`font-nunito mb-2 text-gray-800`}>{title}</h3>
        <div className="flex justify-between items-center">
          <span className={`${nunito.className} text-lg text-gray-900`}>
            ${price} {currency}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
