import Image from "next/image";
import ProductPlaceholderImage from "@/public/product-placeholder.png";
import Link from "next/link";
import { Category } from "@/entities/category/types";
import { CategoriesRoutes } from "@/routes/categories-routes";

interface IProps {
  category: Category;
  className?: string;
}

export const SubcategoryCard: React.FC<IProps> = ({ category, className }) => {
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
      className={`w-83.75 sm:w-100 md:w-125.75 h-25.75 rounded-sm p-2.5 pl-7.5 flex justify-between items-center gap-6.5 border border-stroke hover:shadow-md transition ${className}`}
      href={`${CategoriesRoutes.base}/${slug}`}
    >
      <div>
        <div className="w-full text-base line-clamp-3">{name}</div>

        {!!min_price && (
          <div className="text-sm font-bold mt-2.5 text-blue">
            от {formattedPrice}
          </div>
        )}
      </div>

      <Image
        width={83}
        height={83}
        src={cardImgUrl}
        alt={name}
        className="rounded-xs bg-background"
      />
    </Link>
  );
};
