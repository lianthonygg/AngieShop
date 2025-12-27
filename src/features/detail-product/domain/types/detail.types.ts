import { Product } from "@/src/features/common/domain/types/common.types";

export interface DetailProductResponse {
  data: Product;
}

export interface DetailProductError {
  error: string;
  message: string;
}
