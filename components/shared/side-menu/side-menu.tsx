"use client";

import { RoundedBox } from "../rounded-block/rounded-block";
import Link from "next/link";
import { RightArrowIcon } from "./right-arrow-icon";
import { useAppSelector } from "@/store/hooks";
import { selectCategory } from "@/store/selectors/category-selectors";
import { CategoriesRoutes } from "@/routes/categories-routes";
import { Category } from "@/entities/category/types";

interface SideMenuProps {
  className?: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ className }) => {
  const { items } = useAppSelector(selectCategory);

  return (
    <RoundedBox
      paddingless
      className={`pb-5 w-88 min-w-88 h-fit z-20 ${className}`}
    >
      <div>
        <div className="px-7.5 py-7.5 pb-4 text-2xl font-bold">
          Каталог товаров
        </div>

        <ul className="space-y-2.5">
          {items.map((categ) => {
            const hasSubItems = (categ?.children?.length || 0) > 0;
            return (
              <li key={categ.name} className="group/root relative">
                <Link
                  href={`${CategoriesRoutes.base}/${categ.slug}`}
                  className="w-full flex items-center justify-between px-7.5 py-1.5 text-base hover:text-blue hover:font-bold hover:tracking-tight"
                >
                  {categ.name}
                  {hasSubItems && <RightArrowIcon />}
                </Link>
                <span className="pointer-events-none absolute -bottom-0.5 left-7 right-7 h-px bg-background" />

                {/* Только прямые потомки — и только по наведению на этот <li> */}
                {hasSubItems && (
                  <div className="invisible absolute left-full top-0 w-104.5 rounded-2xl bg-white py-5 px-1 border border-stroke opacity-0 transition group-hover/root:visible group-hover/root:opacity-100">
                    <SubItems items={categ.children || []} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </RoundedBox>
  );
};

interface SubItemsProps {
  items: Category[];
}

const SubItems: React.FC<SubItemsProps> = ({ items }) => {
  return (
    <ul className="space-y-1">
      {items.map((subCateg) => {
        const hasChildren = (subCateg?.children?.length || 0) > 0;

        const rootCls = `group relative rounded-lg hover:bg-background`;

        return (
          <li key={subCateg.name} className={rootCls}>
            <Link
              href={`${CategoriesRoutes.base}/${subCateg.slug}`}
              className="flex items-center justify-between px-7.5 py-2 text-base hover:text-blue hover:font-bold hover:tracking-tight"
            >
              {subCateg.name}
              {hasChildren && <RightArrowIcon />}
            </Link>

            {/* Подменю появляется только при наведении на этот <li> */}
            {hasChildren && (
              <div
                className={`invisible absolute left-full top-0 w-104.5 rounded-2xl bg-white py-5 px-1 border border-stroke opacity-0 transition group-hover:visible group-hover:opacity-100`}
              >
                <SubItems items={subCateg.children || []} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
