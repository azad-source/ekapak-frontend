import { Product } from "@/entities/product/types";
import Image from "next/image";
import ProductPlaceholderImage from "@/public/product-placeholder.png";
import { useAppDispatch } from "@/store/hooks";
import { addItem } from "@/store/slices/cart-slice";
import Link from "next/link";
import { CategoriesRoutes } from "@/routes/categories-routes";

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
      className={`w-45.5 sm:w-62 md:w-65.5 rounded-sm p-5 flex flex-col bg-white hover:shadow-md transition ${className}`}
      href={`${CategoriesRoutes.base}/${categorySlug}/${slug}`}
    >
      <Image width={222} height={222} src={cardImgUrl} alt={name} />

      <div className="mt-5 text-xs text-gray">
        Арт. {product.article || "-"}
      </div>

      <div className="mt-1 w-full text-base text-left line-clamp-3">{name}</div>

      {!!offer && (
        <div className="text-base font-bold mt-5 text-left">
          {formattedPrice} / {offer.unit}
        </div>
      )}

      <button
        className="mt-2.5 bg-blue text-white text-lg font-bold py-3 rounded-sm"
        disabled={!offer}
        onClick={handleAddItem}
      >
        Добавить в корзину
      </button>
    </Link>
  );
};
