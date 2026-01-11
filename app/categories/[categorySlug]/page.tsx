import { TitleBanner } from "@/components/shared/title-banner/title-banner";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SideMenu } from "@/components/shared/side-menu/side-menu";
import { getCategoryBySlug } from "@/entities/category/api";
import { notFound } from "next/navigation";
import CategoryList from "../components/category-list";
import ProductsList from "../components/products-list";
import { PagedProductsResponse } from "@/entities/product/types";
import { getProducts } from "@/entities/product/api";
import { CategoryResponse } from "@/entities/category/types";
import { DEFAULT_PAGE_SIZE } from "@/constants/paging";
import { Breadcrumbs } from "@/components/shared/breadcrumbs/breadcrumbs";
import { getBreadcrumbs } from "@/components/shared/breadcrumbs/helpers";

interface PageProps {
  params: Promise<{
    categorySlug: string;
  }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function SubCategoryPage({
  params,
  searchParams,
}: PageProps) {
  const queryClient = new QueryClient();

  const { categorySlug } = await params;
  const page = Number((await searchParams).page ?? 1);

  /** Префетчим категорию */
  await queryClient.prefetchQuery({
    queryKey: ["category", categorySlug],
    queryFn: () => getCategoryBySlug(categorySlug),
  });

  const categoryResponse = queryClient.getQueryData<CategoryResponse>([
    "category",
    categorySlug,
  ]);

  const category = categoryResponse?.data;

  if (!category) {
    notFound();
  }

  const children = category?.children ?? [];

  /** Если это конечная категория - префетчим товары */
  if (children.length === 0) {
    await queryClient.prefetchQuery({
      queryKey: ["products", categorySlug, page],
      queryFn: () =>
        getProducts({
          category: category.uuid,
          page,
          per_page: DEFAULT_PAGE_SIZE,
        }),
    });
  }

  const productsResponse = queryClient.getQueryData<PagedProductsResponse>([
    "products",
    categorySlug,
    page,
  ]);

  const products = productsResponse?.data ?? [];

  const breadcrumbs = [
    ...getBreadcrumbs([...(category.parents || []), category]),
  ];

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Breadcrumbs items={breadcrumbs} className="mt-10" />
      <TitleBanner className="mt-4" name={category.name} />
      <div className="flex gap-2.5 mt-5">
        <SideMenu className="hidden 2xl:block" />

        {children.length > 0 || products.length > 0 ? (
          <div className="w-full flex flex-col gap-10">
            {children.length > 0 && (
              <CategoryList type="sub-category" items={children} />
            )}

            {!!productsResponse && (
              <ProductsList
                categorySlug={category.slug}
                categoryUuid={category.uuid}
                paginMeta={productsResponse.meta}
              />
            )}
          </div>
        ) : (
          <div className="w-full flex-center px-10 py-50">
            В данной категории нет товаров
          </div>
        )}
      </div>
    </HydrationBoundary>
  );
}
