import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { getCategories } from "@/entities/category/api";
import { getProducts } from "@/entities/product/api";
import ProductsClient from "./products-client";
import { FeatureBanner } from "./feature-banner";

export default async function ProductsPage() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
    }),
    queryClient.prefetchQuery({
      queryKey: ["products", { page: 1 }],
      queryFn: () => getProducts({ page: 1 }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeatureBanner className="mt-12.5" />
      <ProductsClient />
    </HydrationBoundary>
  );
}
