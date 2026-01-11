import { fetcher } from "@/api/fetcher";
import {
  PagedProductsRequest,
  PagedProductsResponse,
  ProductResponse,
} from "./types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = (params?: PagedProductsRequest) => {
  const searchParams = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );

  const query = searchParams.toString();
  const url = `${apiUrl}/products${query ? `?${query}` : ""}`;

  return fetcher<PagedProductsResponse>(url);
};

export const getProductBySlug = (slug: string) => {
  return fetcher<ProductResponse>(`${apiUrl}/products/slug/${slug}`);
};
