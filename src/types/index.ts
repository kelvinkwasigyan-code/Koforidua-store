export type { GhanaRegion, ProductCategorySlug } from "@/lib/constants/ghana";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  quantity: number;
  image: string;
  stockQuantity: number;
}

export interface ApiErrorResponse {
  error: string;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
