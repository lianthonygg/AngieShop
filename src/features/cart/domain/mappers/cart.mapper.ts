import { CartItem, CartResponse, Product } from "../types/cart";

export const CartMapperToResponse = (data: any[]): CartResponse => {
  let items: CartItem[] = [];

  data.forEach((item) => {
    let cartItem = {
      id: item.id,
      quantity: item.quantity,
      product: {
        id: item.product.id,
        name: item.product.name,
        slug: item.product.slug,
        price: item.product.price,
        currency: item.product.currency,
        image_url: item.product.image_url,
      } as Product,
      created_at: item.created_at,
    } as CartItem;

    items.push(cartItem);
  });

  return { items };
};
