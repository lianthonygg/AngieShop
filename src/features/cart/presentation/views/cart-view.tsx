"use client";
import Image from "next/image";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import { CartResponse } from "../../domain/types/cart";
import { updateQuantityCartItem } from "../../infrastructure/cart-item-update-quantity";
import { deleteCartItem } from "../../infrastructure/cart-item-delete";
import { completePurchase } from "../../infrastructure/cart-items-purchase";
import { cartFetch } from "../../infrastructure/cart-fetcher";
import { useState } from "react";

interface CartViewProps {
  data: CartResponse;
  totalItems: number;
  cartId: string;
}

const CartView = ({ data, totalItems, cartId }: CartViewProps) => {
  const [cartResponse, setCartResponse] = useState<CartResponse>(data);

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    await updateQuantityCartItem(cartId, id, quantity);
  };

  const handleRemoveCartItem = async (id: string) => {
    await deleteCartItem(cartId, id);
    let response = await cartFetch(cartId);
    setCartResponse(response);
  };

  const handleCompletePurchase = async (id: string) => {
    await completePurchase(id);
  };

  if (cartResponse.items.length === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-[var(--angie-soft-start)] to-[var(--angie-white)]">
        <Header cartCount={0} />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-40 h-40 rounded-full shadow-xl flex items-center justify-center mb-8">
            <Image
              src="/CartEmpty.png"
              alt="Carrito vacío"
              width={120}
              height={120}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600">
            ¡Explora la tienda y agrega productos!
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header cartCount={totalItems ?? 0} />

      <section className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 pt-6 pb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
            {cartResponse.items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.product.name}
                price={item.product.price}
                quantity={item.quantity}
                imageUrl={item.product.image_url}
                onRemove={handleRemoveCartItem}
                onQuantityChange={handleUpdateQuantity}
              />
            ))}
          </div>

          <CheckoutButton
            items={data.items}
            onFinish={handleCompletePurchase}
            cartId={cartId}
          />
        </div>
      </section>

      <BottomBar />
    </div>
  );
};

export default CartView;
