"use client";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import Header from "../components/Header";
import CartItem from "../components/CartItem";
import CheckoutButton from "../components/CheckoutButton";
import { CartResponse } from "../../domain/types/cart";
import { updateQuantityCartItem } from "../../infrastructure/cart-item-update-quantity";
import { deleteCartItem } from "../../infrastructure/cart-item-delete";
import { completePurchase } from "../../infrastructure/cart-items-purchase";

interface CartViewProps {
  data: CartResponse;
  totalItems: number;
  cartId: string;
}

const CartView = ({ data, totalItems, cartId }: CartViewProps) => {
  const handleUpdateQuantity = async (id: string, quantity: number) => {
    await updateQuantityCartItem(id, quantity);
  };

  const handleRemoveCartItem = async (id: string) => {
    await deleteCartItem(id);
  };

  const handleCompletePurchase = async (id: string) => {
    await completePurchase(id);
  };

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header cartCount={totalItems ?? 0} />
      <section className="md:max-w-6xl mx-auto px-4 pt-6 pb-40 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto w-full px-4">
          {data.items.map((item) => (
            <CartItem
              key={item.id}
              id={item.product.id}
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
      </section>
      <BottomBar />
    </div>
  );
};

export default CartView;
