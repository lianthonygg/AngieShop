import { Minus, Plus, ShoppingBag, ShoppingCart } from "lucide-react";
import { NextFontWithVariable } from "next/dist/compiled/@next/font";
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
  id: string;
  openSheet: () => void;
  font: NextFontWithVariable;
  src: string;
  alt: string;
  title: string;
  price: number;
  currency: string;
};

function ProductCard({
  id,
  openSheet,
  font,
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
      onClick={openSheet}
      className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative w-full h-52 md:h-64 overflow-hidden bg-gray-100 rounded-t-lg">
        {src ? (
          <Image
            src={`product-images/${src}`}
            alt={alt}
            fill
            loader={supabaseLoader}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          />
        ) : (
          <div className="w-full h-full bg-gray-200 animate-pulse" />
        )}
      </div>

      <div className="p-3">
        <h3 className={`${font.className} mb-2 text-gray-800`}>{title}</h3>
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
