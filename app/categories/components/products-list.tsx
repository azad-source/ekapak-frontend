"use client";

import { ProductCard } from "@/app/categories/components/product-card";
import { Pagination } from "@/components/shared/pagintation/pagintation";
import { PaginMeta } from "@/entities/pagin/types";
import { useSearchParams } from "next/navigation";
import { useProductsQuery } from "@/entities/product/queries";
import { LoadingOverlay } from "@/components/shared/loading-overlay/loading-overlay";

interface IProps {
  categorySlug: string;
  categoryUuid: string;
  paginMeta: PaginMeta;
}

export default function ProductsList({
  categorySlug,
  categoryUuid,
  paginMeta,
}: IProps) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const { data, isFetching } = useProductsQuery({
    categoryUuid,
    page,
  });

  const products = data?.data ?? [];

  return (
    <div className="relative">
      {/* 🔄 Overlay */}
      {isFetching && <LoadingOverlay />}

      <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-2.5 place-items-center">
        {products.map((product) => (
          <ProductCard
            key={product.uuid}
            categorySlug={categorySlug}
            product={product}
          />
        ))}
      </div>

      <Pagination
        currentPage={paginMeta.current_page}
        totalPages={Math.ceil(paginMeta.total / paginMeta.per_page)}
      />
    </div>
  );
}
