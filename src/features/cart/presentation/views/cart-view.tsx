"use client";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import Image from "next/image";
import Header from "../components/Header";
import { useCartItems } from "../hooks/useCartItems";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";

const CartView = () => {
  const { data, error, isLoading, state, totalItems } = useCartItems();

  if (state === false) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Header cartCount={0} />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center mb-8">
            <Image
              src="/CartEmpty.png"
              alt="Inicia sesión para ver tu carrito"
              width={120}
              height={120}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600">
            Inicia sesión para ver los productos que has guardado.
          </p>
        </section>
        <BottomBar />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Header cartCount={totalItems ?? 0} />
        <section className="flex-1 flex items-center justify-center">
          <p className="text-lg">Cargando tu carrito...</p>
        </section>
        <BottomBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Header cartCount={0} />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <p className="text-red-600 mb-4">Error al cargar el carrito</p>
          <p className="text-gray-600">Inténtalo de nuevo más tarde.</p>
        </section>
        <BottomBar />
      </div>
    );
  }

  if (!data || totalItems === 0) {
    return (
      <div className="w-full min-h-screen flex flex-col">
        <Header cartCount={0} />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-40 h-40 rounded-full bg-white shadow-xl flex items-center justify-center mb-8">
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
        <BottomBar />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header cartCount={totalItems ?? 0} />
      <section className="flex-1 px-4 pt-6 pb-24 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto w-full">
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
