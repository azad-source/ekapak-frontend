import { fetcher } from "@/api/fetcher";
import {
  PagedProductsRequest,
  PagedProductsResponse,
  ProductResponse,
} from "./types";

const BASE_URL = "https://api.ekapak.ru/api";

export const getProducts = (params?: PagedProductsRequest) => {
  const searchParams = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );

  const query = searchParams.toString();
  const url = `${BASE_URL}/products${query ? `?${query}` : ""}`;

  return fetcher<PagedProductsResponse>(url);
};

export const getProductBySlug = (slug: string) => {
  return fetcher<ProductResponse>(`${BASE_URL}/products/slug/${slug}`);
};
