"use client";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import { CartResponse } from "../../domain/types/cart";

interface CartViewProps {
  data: CartResponse;
  totalItems: number;
}

const CartView = ({ data, totalItems }: CartViewProps) => {
  // if (isLoading) {
  //   return (
  //     <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-[var(--angie-soft-start)] to-[var(--angie-white)]">
  //       <Header cartCount={totalItems ?? 0} />
  //       <section className="flex-1 flex items-center justify-center">
  //         <p className="text-lg">Cargando tu carrito...</p>
  //       </section>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header cartCount={totalItems ?? 0} />
      <section className="flex-1 px-4 pt-6 pb-24 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full px-4">
          {data.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.product.id}
              title={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              imageUrl={item.product.image_url}
            />
          ))}
        </div>
        <CheckoutButton
          items={data.items}
          // totalPrice={0}
        />
      </section>
      <BottomBar />
    </div>
  );
};

export default CartView;
