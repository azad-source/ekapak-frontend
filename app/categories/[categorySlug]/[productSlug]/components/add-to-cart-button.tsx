"use client";

import { Product } from "@/entities/product/types";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";

export const AddToCartButton = ({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) => {
  const dispatch = useAppDispatch();

  const { offers } = product;

  const offer = offers?.[0];

  const handleAddItem = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!offer) return;

    dispatch(
      addItem({
        offerId: offer.uuid,
        productId: product.uuid,
        productName: product.name,
        price: +offer.price,
        currency: offer.currency,
        quantity: 1,
        unit: offer.unit,
      })
    );
  };

  return (
    <button
      className={`bg-blue text-white text-lg font-bold px-5 py-3 rounded-sm ${className}`}
      disabled={!offer}
      onClick={handleAddItem}
    >
      В корзину
    </button>
  );
};
