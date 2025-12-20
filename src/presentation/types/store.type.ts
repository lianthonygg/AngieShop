export type ProductResponse = {
  data: Product[];
};

export type ProductByIdResponse = {
  data: Product;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  currency: number;
  //category: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  product_images: Banner[];
};

export type Banner = {
  id: number;
  image_url: string;
  slug: string;
};
