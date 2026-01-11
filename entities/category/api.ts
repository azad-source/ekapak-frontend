import { fetcher } from "@/api/fetcher";
import { CategoriesResponse, CategoryResponse } from "./types";

const BASE_URL = "https://api.ekapak.ru/api";

export const getCategories = (params?: { search?: string }) => {
  const searchParams = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );

  const query = searchParams.toString();

  return fetcher<CategoriesResponse>(
    `${BASE_URL}/categories${query ? `?${query}` : ""}`
  );
};

export const getCategoryBySlug = (slug: string) => {
  return fetcher<CategoryResponse>(`${BASE_URL}/categories/slug/${slug}`);
};
