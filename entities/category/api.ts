import { fetcher } from "@/api/fetcher";
import { CategoriesResponse, CategoryResponse } from "./types";

const BASE_URL = "https://api.ekapak.ru/api";

export const getCategories = () => {
  return fetcher<CategoriesResponse>(`${BASE_URL}/categories`);
};

export const getCategoryBySlug = (slug: string) => {
  return fetcher<CategoryResponse>(`${BASE_URL}/categories/slug/${slug}`);
};
