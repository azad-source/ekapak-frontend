import { fetcher } from "@/api/fetcher";
import { CategoriesResponse, CategoryResponse } from "./types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getCategories = (params?: { search?: string }) => {
  const searchParams = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => [key, String(value)])
  );

  const query = searchParams.toString();

  return fetcher<CategoriesResponse>(
    `${apiUrl}/categories${query ? `?${query}` : ""}`
  );
};

export const getCategoryBySlug = (slug: string) => {
  return fetcher<CategoryResponse>(`${apiUrl}/categories/slug/${slug}`);
};
