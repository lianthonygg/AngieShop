import { Product } from "@/src/features/common/domain/types/common.types";

export interface ProductResponse {
  data: Product[];
}

export interface ProductError {
  error: string;
  message: string;
}


