import { useQuery } from "@tanstack/react-query";
import { getProducts } from "./api";
import { DEFAULT_PAGE_SIZE } from "@/constants/paging";

interface Params {
  categoryUuid: string;
  page: number;
}

export function useProductsQuery({ categoryUuid, page }: Params) {
  return useQuery({
    queryKey: ["products", categoryUuid, page],
    queryFn: () =>
      getProducts({
        category: categoryUuid,
        page,
        per_page: DEFAULT_PAGE_SIZE,
      }),
    placeholderData: (previousData) => previousData,
  });
}
