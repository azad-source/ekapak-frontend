"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/entities/category/api";
import { getProducts } from "@/entities/product/api";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/slices/cart-slice";
import { SideMenu } from "@/shared/ui/side-menu/side-menu";

export default function ProductsClient() {
  const dispatch = useDispatch();

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["products", { page: 1 }],
    queryFn: () => getProducts({ page: 1 }),
  });

  if (categoriesLoading || productsLoading) {
    return <div className="p-4">Загрузка…</div>;
  }

  return (
    <div className="flex gap-2.5 mt-5">
      {/* Категории */}
      <SideMenu items={categories} className="hidden 2xl:block" />

      {/* Товары */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Товары</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products?.map((product) => {
            const offer = product.offers?.[0];

            return (
              <div
                key={product.uuid}
                className="border rounded p-3 flex flex-col gap-2"
              >
                <div className="font-medium">{product.name}</div>

                {offer && (
                  <div className="text-sm text-gray-600">
                    {offer.price_display_text ??
                      `${offer.price_value} ${offer.price_currency}`}
                  </div>
                )}

                <button
                  className="mt-auto bg-black text-white text-sm py-1 rounded"
                  disabled={!offer}
                  onClick={() => {
                    if (!offer) return;

                    dispatch(
                      addItem({
                        offerId: offer.uuid,
                        productId: product.uuid,
                        productName: product.name,
                        price: offer.price_value,
                        currency: offer.price_currency,
                        quantity: 1,
                        unit: offer.base_unit_name_full,
                      })
                    );
                  }}
                >
                  В корзину
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
