import { BreadCrumbItem } from "@/components/shared/breadcrumbs/breadcrumbs";
import { Category } from "@/entities/category/types";
import { CategoriesRoutes } from "@/routes/categories-routes";

export function getBreadcrumbs(
  categories?: Category[] | null
): BreadCrumbItem[] {
  if (!categories?.length) return [];

  return categories.map(({ name, slug }) => ({
    caption: name,
    link: `${CategoriesRoutes.base}/${slug}`,
  }));
}
