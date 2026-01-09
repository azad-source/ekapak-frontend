import { Category } from "@/entities/category/types";
import { RoundedBox } from "../rounded-block/rounded-block";
import Link from "next/link";
import { RightArrowIcon } from "./right-arrow-icon";

interface IProps {
  items?: Category[];
  className?: string;
}

export const SideMenu: React.FC<IProps> = ({ items = [], className }) => {
  return (
    <RoundedBox paddingless className={`pb-5 w-89 min-w-89 h-fit ${className}`}>
      <div>
        <div className="px-7.5 py-7.5 pb-4 text-2xl font-bold">
          Каталог товаров
        </div>

        <ul className="space-y-2.5">
          {items.map((categ) => {
            const subItems = categ?.children || [];
            const hasSubItems = subItems.length > 0;

            return (
              <li key={categ.name} className="group relative">
                <Link
                  href={`/products/${categ.slug}`}
                  className="w-full flex items-center justify-between px-7.5 py-1.5 text-base hover:text-blue hover:font-bold hover:tracking-tight"
                >
                  {categ.name}
                  {hasSubItems && <RightArrowIcon />}
                </Link>
                <span className="pointer-events-none absolute -bottom-0.5 left-7 right-7 h-px bg-background" />

                {/* Подменю */}
                {hasSubItems && (
                  <div className="invisible absolute left-full top-0 w-104.5 rounded-2xl bg-white py-5 px-1 border border-stroke opacity-0 transition group-hover:visible group-hover:opacity-100">
                    <ul className="space-y-1">
                      {subItems.map((subCateg) => {
                        return (
                          <li
                            key={subCateg.name}
                            className="rounded-lg hover:bg-background"
                          >
                            <Link
                              href={`/products/${categ.slug}/${subCateg.slug}`}
                              className="flex items-center px-7.5 py-2 text-base hover:text-blue hover:font-bold hover:tracking-tight"
                            >
                              {subCateg.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
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
