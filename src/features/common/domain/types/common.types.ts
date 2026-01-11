export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  product_images: Banner[];
}

export interface Banner {
  id: number;
  image_url: string;
  slug: string;
  category: string;
}
