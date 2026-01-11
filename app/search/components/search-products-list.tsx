"use client";

import { ProductCard } from "@/app/categories/components/product-card";
import { Pagination } from "@/components/shared/pagintation/pagintation";
import { PagedProductsResponse } from "@/entities/product/types";

interface IProps {
  result: PagedProductsResponse | undefined;
}

export default function SearchProductsList({ result }: IProps) {
  const products = result?.data ?? [];
  const paginMeta = result?.meta;

  return (
    <div className="relative h-full">
      {!!products.length ? (
        <>
          <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2.5 place-items-center">
            {products.map((product) => (
              <ProductCard
                key={product.uuid}
                categorySlug={product.category_uuid}
                product={product}
              />
            ))}
          </div>

          {paginMeta && (
            <Pagination
              currentPage={paginMeta?.current_page}
              totalPages={Math.ceil(paginMeta?.total / paginMeta?.per_page)}
            />
          )}
        </>
      ) : (
        <div className="h-full grow flex-center text-lg">Товары не найдены</div>
      )}
    </div>
  );
}
