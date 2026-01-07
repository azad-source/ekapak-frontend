import { fetcher } from "@/shared/api/fetcher";
import { Category } from "./types";

const BASE_URL = "https://api.ekapak.ru/api";

export const getCategories = () =>
  fetcher<Category[]>(`${BASE_URL}/categories`);
