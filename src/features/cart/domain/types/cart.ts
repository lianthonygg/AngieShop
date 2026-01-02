export interface CartResponse {
  items: CartItem[];
}

export interface CartError {
  error: string;
  message: string;
}

export interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  product: Product;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image_url: string;
}
