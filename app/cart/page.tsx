import { cartFetch } from "@/src/features/cart/infrastructure/cart-fetcher";
import Header from "@/src/features/cart/presentation/components/Header";
import CartView from "@/src/features/cart/presentation/views/cart-view";
import { authOptions } from "@/src/features/common/lib/auth-options";
import { getServerSession } from "next-auth";
import Image from "next/image";

export const metadata = {
  title: "Carrito | Angie Shop",
  description: "Carrito de Compras de Angie Shop",
};

async function CartPage() {
  const session = await getServerSession(authOptions);
  let cartItems;

  if (session == null) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-[var(--angie-soft-start)] to-[var(--angie-white)]">
        <Header cartCount={0} />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-40 h-40 rounded-full shadow-xl flex items-center justify-center mb-8">
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
      </div>
    );
  }

  try {
    cartItems = await cartFetch(session?.user?.cartId ?? "");
  } catch (err: any) {
    return (
      <div className="w-full min-h-screen flex flex-col bg-gradient-to-b from-[var(--angie-soft-start)] to-[var(--angie-white)]">
        <Header cartCount={0} />
        <section className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <span className="text-6xl mb-4">😞</span>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Algo salió mal
          </h2>

          <p className="text-gray-500 text-sm">Inténtalo de nuevo más tarde.</p>
        </section>
      </div>
    );
  }

  const totalItems =
    cartItems?.items?.reduce((sum, item) => sum + (item as any).quantity, 0) ||
    0;

  if (!cartItems || totalItems === 0) {
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

  return <CartView data={cartItems} totalItems={totalItems} />;
}

export default CartPage;
