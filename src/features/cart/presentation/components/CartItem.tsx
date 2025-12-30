"use client";
import supabaseLoader from "@/src/features/common/lib/supabase-loader";
import axios from "axios";
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
};

function CartItem({
  id,
  title,
  price,
  quantity: initialQuantity,
  imageUrl,
  onQuantityChange,
}: CartItemProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const deleteCartItem = async (id: string) => {
    try {
      // await axios.delete(`/api/cart/${id}`); // ← Cambia a tu endpoint real
      console.log("Eliminar item:", id);
      // Opcional: refrescar el carrito después de eliminar
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    setIsUpdating(true);
    setQuantity(newQuantity);

    try {
      // Aquí llamas a tu Server Action (ej: updateQuantity(id, newQuantity))
      if (onQuantityChange) {
        await onQuantityChange(id, newQuantity);
      }
      // Si no tienes acción, puedes usar axios:
      // await axios.patch(`/api/cart/${id}`, { quantity: newQuantity });
    } catch (err) {
      console.error("Error actualizando cantidad", err);
      setQuantity(initialQuantity); // rollback en caso de error
    } finally {
      setIsUpdating(false);
    }
  };

  const totalPrice = price * quantity;

  return (
    <section className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100">
      <div className="flex items-center gap-4 p-4">
        {/* Imagen */}
        <div className="flex-shrink-0">
          <div className="w-32 h-32 md:w-36 md:h-36 relative rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={`product-images/${imageUrl}`}
              alt={title}
              fill
              loader={supabaseLoader}
              className="object-cover"
              sizes="(max-width: 768px) 128px, 144px"
            />
          </div>
        </div>

        {/* Info del producto */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => updateQuantity(quantity - 1)}
              disabled={isUpdating || quantity <= 1}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Minus className="w-4 h-4" />
            </button>

            <span className="text-lg font-semibold w-12 text-center">
              {quantity}
            </span>

            <button
              onClick={() => updateQuantity(quantity + 1)}
              disabled={isUpdating}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Precio total */}
          <p className="text-2xl font-bold text-gray-900 mt-3">
            ${totalPrice.toFixed(2)}
          </p>

          {/* Precio unitario (opcional, sutil) */}
          <p className="text-sm text-gray-500">${price.toFixed(2)} c/u</p>
        </div>
      </div>

      {/* Botón eliminar */}
      <button
        onClick={() => deleteCartItem(id)}
        className="absolute bottom-4 right-4 p-3 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
        aria-label="Eliminar del carrito"
      >
        <Trash2 className="w-5 h-5 text-red-600" />
      </button>
    </section>
  );
}

export default CartItem;
