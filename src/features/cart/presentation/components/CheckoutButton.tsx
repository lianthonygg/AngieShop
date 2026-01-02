"use client";

import { ShoppingCart } from "lucide-react";

type CheckoutButtonProps = {
  items: Array<{
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }>;
  totalPrice?: number;
};

function CheckoutButton({ items, totalPrice }: CheckoutButtonProps) {
  const calculatedTotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const finalTotal = totalPrice || calculatedTotal;

  const generateMessage = () => {
    if (items.length === 0) return "Hola, quiero hacer un pedido.";

    const productLines = items.map(
      (item) =>
        `• ${item.product.name} - Cantidad: ${item.quantity} - Subtotal: $${(
          item.product.price * item.quantity
        ).toFixed(2)}`
    );

    const message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${productLines.join(
      "\n"
    )}\n\n*Total: $${finalTotal.toFixed(2)}*\n\n¡Gracias!`;

    return encodeURIComponent(message);
  };

  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${generateMessage()}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-11/12 max-w-md bg-gradient-to-r from-[var(--angie-pink-start)] to-[var(--angie-pink-end)] text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 z-10"
    >
      <ShoppingCart className="w-6 h-6" />
      Completar Compra
    </a>
  );
}

export default CheckoutButton;
