import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SideMenu } from "@/components/shared/side-menu/side-menu";
import { PagedProductsResponse } from "@/entities/product/types";
import { getProducts } from "@/entities/product/api";
import { DEFAULT_PAGE_SIZE } from "@/constants/paging";
import SearchProductsList from "./components/search-products-list";
import { TitleBanner } from "@/components/shared/title-banner/title-banner";

interface PageProps {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function SearchPage({ params, searchParams }: PageProps) {
  const queryClient = new QueryClient();

  const { categorySlug } = await params;
  const page = Number((await searchParams).page ?? 1);
  const search = (await searchParams).search;

  await queryClient.prefetchQuery({
    queryKey: ["products", categorySlug, page],
    queryFn: () => getProducts({ page, per_page: DEFAULT_PAGE_SIZE, search }),
  });

  const productsResponse = queryClient.getQueryData<PagedProductsResponse>([
    "products",
    categorySlug,
    page,
  ]);

  const searchCaption = search?.trim()
    ? `Поиск по запросу «${search}»`
    : undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TitleBanner name="Поиск" className="mt-8" description={searchCaption} />

      <div className="flex gap-2.5 mt-5">
        <SideMenu className="hidden 2xl:block" />

        <div className="w-full flex flex-col gap-10">
          <SearchProductsList result={productsResponse} />
        </div>
      </div>
    </HydrationBoundary>
  );
}
