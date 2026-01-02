"use client";

import supabaseLoader from "@/src/features/common/lib/supabase-loader";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onQuantityChange?: (id: string, newQuantity: number) => Promise<void>;
  onRemove?: (id: string) => Promise<void>;
};

export default function CartItem({
  id,
  title,
  price,
  quantity: initialQuantity,
  imageUrl,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const totalPrice = price * quantity;

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    setIsUpdating(true);
    setQuantity(newQuantity);
    try {
      if (onQuantityChange) await onQuantityChange(id, newQuantity);
    } catch (err) {
      console.error("Error actualizando cantidad", err);
      setQuantity(initialQuantity);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      if (onRemove) await onRemove(id);
    } catch (err) {
      if ((err as any)?.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border border-gray-200">
      {/* Imagen que llena casi toda la card */}
      <div className="relative aspect-[4/5] md:aspect-[3/4]">
        <Image
          src={`product-images/${imageUrl}`}
          alt={title}
          fill
          loader={supabaseLoader}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />

        {/* Botón eliminar en esquina superior derecha */}
        <button
          onClick={handleRemove}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors shadow-md"
          aria-label="Eliminar del carrito"
        >
          <Trash2 className="w-5 h-5 text-red-600" />
        </button>
      </div>

      {/* Información superpuesta en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 pt-8">
        <h3 className="text-white font-semibold text-lg line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* Controles de cantidad */}
        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => updateQuantity(quantity - 1)}
            disabled={isUpdating || quantity <= 1}
            className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white disabled:opacity-50 transition"
          >
            <Minus className="w-4 h-4 text-gray-800" />
          </button>

          <span className="text-white font-bold text-lg min-w-10 text-center">
            {quantity}
          </span>

          <button
            onClick={() => updateQuantity(quantity + 1)}
            disabled={isUpdating}
            className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition"
          >
            <Plus className="w-4 h-4 text-gray-800" />
          </button>
        </div>

        {/* Precios */}
        <div className="mt-3">
          <p className="text-white text-2xl font-bold">
            ${totalPrice.toLocaleString()}
          </p>
          <p className="text-white/80 text-sm">${price.toLocaleString()} c/u</p>
        </div>
      </div>
    </div>
  );
}
