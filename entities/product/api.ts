import { fetcher } from "@/shared/api/fetcher";
import { Product } from "./types";

const BASE_URL = "https://api.ekapak.ru/api";

export const getProducts = (params?: { category?: string; page?: number }) => {
  const searchParams = new URLSearchParams();

  if (params?.category) {
    searchParams.set("category", params.category);
  }

  if (params?.page) {
    searchParams.set("page", String(params.page));
  }

  const query = searchParams.toString();

  return fetcher<Product[]>(`${BASE_URL}/products${query ? `?${query}` : ""}`);
};
