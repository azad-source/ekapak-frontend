import Image from "next/image";
import ProductPlaceholderImage from "@/public/product-placeholder.png";
import Link from "next/link";
import { Category } from "@/entities/category/types";
import { CategoriesRoutes } from "@/routes/categories-routes";

interface IProps {
  category: Category;
  className?: string;
}

export const CategoryCard: React.FC<IProps> = ({ category, className }) => {
  const { name, slug, image_url, min_price } = category;

  const cardImgUrl = image_url ? image_url : ProductPlaceholderImage.src;

  const formattedPrice = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseInt(min_price ?? ""));

  return (
    <Link
      className={`w-40.75 h-full sm:w-55 md:w-61 rounded-sm p-5 flex flex-col bg-background hover:shadow-md transition ${className}`}
      href={`${CategoriesRoutes.base}/${slug}`}
    >
      <Image
        width={222}
        height={222}
        src={cardImgUrl}
        alt={name}
        className="rounded-sm bg-white p-4"
      />

      <div className="mt-5 mb-2.5 w-full text-base text-center line-clamp-3">
        {name}
      </div>

      {!!min_price && (
        <div className="text-sm font-bold mt-auto text-blue text-center">
          от {formattedPrice}
        </div>
      )}
    </Link>
  );
};
