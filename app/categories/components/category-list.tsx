"use client";

import { CategoryCard } from "./category-card";
import { RoundedBox } from "@/components/shared/rounded-block/rounded-block";
import { Category } from "@/entities/category/types";
import { SubcategoryCard } from "./subcategory-card";

interface IProps {
  type: "category" | "sub-category";
  items: Category[];
}

export default function CategoryList({ type, items }: IProps) {
  const isCategory = type === "category";

  const CardComponent = isCategory ? CategoryCard : SubcategoryCard;

  const baseCls =
    "w-full grid gap-y-2.5 place-items-center justify-between p-5 md:p-7.5";

  const categoryCls = "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";

  const subcategoryCls = "grid-cols-1 xl:grid-cols-2";

  return (
    <RoundedBox
      paddingless
      className={`${baseCls} ${isCategory ? categoryCls : subcategoryCls}`}
    >
      {items?.map((item) => (
        <CardComponent key={item.uuid} category={item} />
      ))}
    </RoundedBox>
  );
}
