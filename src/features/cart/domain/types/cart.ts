interface CartResponse {
  items: CartItem[];
}

interface CartError {
  error: string;
  message: string;
}

interface CartItem {
  id: string;
  quantity: number;
  product_id: string;
  product: Product;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  currency: string;
  image_url: string;
}
