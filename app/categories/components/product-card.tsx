import { Product } from "@/entities/product/types";
import Image from "next/image";
import ProductPlaceholderImage from "@/public/product-placeholder.png";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";
import Link from "next/link";
import { CategoriesRoutes } from "@/routes/categories-routes";
import { getRandomBoolean } from "@/utils/generateMock";

interface IProps {
  categorySlug: string;
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<IProps> = ({
  categorySlug,
  product,
  className,
}) => {
  const dispatch = useAppDispatch();

  const { images, name, slug, offers } = product;

  const offer = offers?.[0];

  const cardImgUrl =
    images?.length && images.length > 0
      ? images[0].card_url
      : ProductPlaceholderImage.src;

  const formattedPrice = offer
    ? new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: offer.currency || "RUB",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(+offer.price)
    : "-";

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
    <Link
      className={`w-45.5 h-full sm:w-62 md:w-65.5 rounded-sm p-5 flex flex-col bg-white hover:shadow-md transition ${className}`}
      href={`${CategoriesRoutes.base}/${categorySlug}/${slug}`}
    >
      <Image width={222} height={222} src={cardImgUrl} alt={name} />

      <div className="mt-5 text-xs text-gray">
        Арт. {product.article || "-"}
      </div>

      <div className="mt-1 w-full text-base text-left line-clamp-3">{name}</div>

      <div className="flex justify-between items-center flex-wrap gap-2 mt-5 mb-7.5">
        {!!offer && (
          <div className="text-base font-bold text-left relative">
            {formattedPrice} / {offer.unit}
            {product.vat_rate != null && (
              <span
                title={`С ${product.vat_type} ${product.vat_rate}%`}
                className="absolute top-0 -right-4 rounded-full border border-blue text-blue w-3.25 h-3.25 flex-center text-sm pt-1.25"
              >
                *
              </span>
            )}
          </div>
        )}

        {getRandomBoolean() ? (
          <span className="flex justify-between items-center gap-2.5">
            <span className="text-blue text-base">Под заказ</span>
            <span className="rounded-full border border-stroke w-5 h-5 flex-center text-sm">
              ?
            </span>
          </span>
        ) : (
          <span className="text-green text-base">В наличии</span>
        )}
      </div>

      <button
        className="mt-auto bg-blue text-white text-lg font-bold py-3 rounded-sm"
        disabled={!offer}
        onClick={handleAddItem}
      >
        Добавить в корзину
      </button>
    </Link>
  );
};
